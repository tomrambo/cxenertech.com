import { readLeadAttribution } from '~/utils/lead-attribution'

export default defineNuxtPlugin({
  name: 'lead-attribution',
  enforce: 'pre',
  setup() {
    let storage: Storage | undefined
    try {
      storage = window.sessionStorage
    } catch {
      // Private browser settings may deny access to sessionStorage.
    }
    return {
      provide: { leadAttribution: readLeadAttribution(window.location.href, storage) },
    }
  },
})
