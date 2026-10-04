// Centralised, validated configuration. Fails fast at boot if anything
// required is missing, instead of failing on the first embed request.
const required = [
  'AZURE_TENANT_ID',
  'AZURE_CLIENT_ID',
  'AZURE_CLIENT_SECRET',
  'PBI_WORKSPACE_ID',
  'PBI_REPORT_ID',
]

const missing = required.filter((key) => !process.env[key])
if (missing.length) {
  throw new Error(`Missing environment variables: ${missing.join(', ')}`)
}

export const config = {
  tenantId: process.env.AZURE_TENANT_ID,
  clientId: process.env.AZURE_CLIENT_ID,
  clientSecret: process.env.AZURE_CLIENT_SECRET,
  workspaceId: process.env.PBI_WORKSPACE_ID,
  reportId: process.env.PBI_REPORT_ID,
  rlsRole: process.env.PBI_RLS_ROLE ?? 'Pharmacy',
  port: Number(process.env.PORT ?? 3000),
  allowedOrigin: process.env.ALLOWED_ORIGIN ?? 'http://localhost:3000',
  powerBiApi: 'https://api.powerbi.com/v1.0/myorg',
  powerBiScope: 'https://analysis.windows.net/powerbi/api/.default',
}
