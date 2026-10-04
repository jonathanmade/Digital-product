// Resolves WHO is calling and WHICH pharmacy they belong to.
//
// Security rule of the whole design: the pharmacy ID is NEVER taken from the
// query string or the request body. It comes from the authenticated session
// of the portal (cookie / JWT validated server-side) and a trusted mapping
// user → pharmacy. If a user could choose the ID, RLS would be meaningless.
//
// Replace `lookupPharmacyForUser` with the portal's real identity source
// (ERP user table, Entra External ID claims, etc.).

const DEMO_USERS = new Map([
  // session token  →  pharmacy ID (matches DimPharmacy[PharmacyId])
  ['demo-token-farmacia-001', 'PH-001'],
  ['demo-token-farmacia-002', 'PH-002'],
])

async function lookupPharmacyForUser(sessionToken) {
  return DEMO_USERS.get(sessionToken) ?? null
}

export async function requirePharmacyUser(req, res, next) {
  try {
    const header = req.get('authorization') ?? ''
    const sessionToken = header.startsWith('Bearer ') ? header.slice(7) : null
    if (!sessionToken) return res.status(401).json({ error: 'Not authenticated' })

    const pharmacyId = await lookupPharmacyForUser(sessionToken)
    if (!pharmacyId) return res.status(403).json({ error: 'User is not linked to a pharmacy' })

    req.pharmacyId = pharmacyId
    next()
  } catch (err) {
    next(err)
  }
}
