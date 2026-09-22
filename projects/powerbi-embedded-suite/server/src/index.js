import express from 'express'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { config } from './config.js'
import { requirePharmacyUser } from './auth.js'
import { generateEmbedConfig } from './powerbi.js'

const app = express()
const webDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../web')

// Minimal CORS for the portal origin (use the `cors` package if you need more).
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', config.allowedOrigin)
  res.set('Access-Control-Allow-Headers', 'Authorization, Content-Type')
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})

app.get('/health', (_req, res) => res.json({ status: 'ok' }))

// Embed configuration for the calling pharmacy. The browser never sees the
// service-principal secret or the Entra ID token — only a short-lived,
// read-only embed token scoped to one report and one RLS identity.
app.get('/api/embed-config', requirePharmacyUser, async (req, res, next) => {
  try {
    const embed = await generateEmbedConfig(req.pharmacyId)
    res.set('Cache-Control', 'no-store')
    res.json({ ...embed, pharmacyId: req.pharmacyId })
  } catch (err) {
    next(err)
  }
})

// Serves the reference embed page (web/embed.html) for local testing.
app.use(express.static(webDir))

// Express only treats 4-argument middleware as an error handler.
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: 'Could not generate embed configuration' })
})

app.listen(config.port, () => {
  console.log(`Power BI embed API listening on http://localhost:${config.port}`)
})
