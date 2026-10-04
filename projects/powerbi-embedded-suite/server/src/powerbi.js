import { ConfidentialClientApplication } from '@azure/msal-node'
import { config } from './config.js'

// ── 1. Microsoft Entra ID: service-principal token ──────────────────────────
// Client-credentials flow. MSAL caches the token in memory and only calls
// Entra ID again when it is close to expiry.
const msal = new ConfidentialClientApplication({
  auth: {
    clientId: config.clientId,
    authority: `https://login.microsoftonline.com/${config.tenantId}`,
    clientSecret: config.clientSecret,
  },
})

async function getAadToken() {
  const result = await msal.acquireTokenByClientCredential({
    scopes: [config.powerBiScope],
  })
  if (!result?.accessToken) throw new Error('Could not acquire Entra ID token')
  return result.accessToken
}

async function pbiFetch(path, options = {}) {
  const token = await getAadToken()
  const res = await fetch(`${config.powerBiApi}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
  if (!res.ok) {
    // Power BI returns a request id that support needs to trace failures.
    const requestId = res.headers.get('requestid')
    const body = await res.text()
    throw new Error(`Power BI API ${res.status} (requestId ${requestId}): ${body}`)
  }
  return res.json()
}

// ── 2. Report metadata (embedUrl + datasetId) ──────────────────────────────
// Cached: it only changes when the report is republished to another dataset.
let reportCache = null
async function getReport() {
  if (!reportCache) {
    const report = await pbiFetch(
      `/groups/${config.workspaceId}/reports/${config.reportId}`,
    )
    reportCache = {
      id: report.id,
      name: report.name,
      embedUrl: report.embedUrl,
      datasetId: report.datasetId,
    }
  }
  return reportCache
}

// ── 3. Embed token with an effective identity (RLS) ────────────────────────
// The pharmacy ID travels as the effective identity `username`. Inside the
// semantic model the RLS role filters DimPharmacy[PharmacyId] against
// USERPRINCIPALNAME(), which returns exactly this value. One report, one
// dataset — every pharmacy only ever receives its own rows.
export async function generateEmbedConfig(pharmacyId) {
  const report = await getReport()

  const token = await pbiFetch('/GenerateToken', {
    method: 'POST',
    body: JSON.stringify({
      datasets: [{ id: report.datasetId }],
      reports: [{ id: report.id, allowEdit: false }],
      identities: [
        {
          username: String(pharmacyId),
          roles: [config.rlsRole],
          datasets: [report.datasetId],
        },
      ],
    }),
  })

  return {
    reportId: report.id,
    reportName: report.name,
    embedUrl: report.embedUrl,
    accessToken: token.token,
    expiration: token.expiration, // ISO timestamp — the client refreshes before this
  }
}
