import { seoRedirectTarget } from '~/utils/seo-redirects'

export default defineNuxtRouteMiddleware((to) => {
  const dest = seoRedirectTarget(to.path)
  if (!dest || dest === to.path) return
  return navigateTo(dest, { redirectCode: 301, replace: true })
})
