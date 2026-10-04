import { useSyncExternalStore } from 'react'
import { getConsent, subscribeConsent } from '../utils/analytics'

// 'granted' | 'denied' | null (visitor hasn't answered yet)
export function useConsent() {
  return useSyncExternalStore(subscribeConsent, getConsent, () => null)
}
