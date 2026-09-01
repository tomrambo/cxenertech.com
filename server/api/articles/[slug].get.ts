import { resolveWebsiteArticle, resolveWebsiteArticles } from '../../utils/website-articles'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing article slug' })
  }

  const [{ article, source }, list] = await Promise.all([
    resolveWebsiteArticle(event, slug),
    resolveWebsiteArticles(event).catch(() => ({ articles: [] })),
  ])

  if (!article) {
    throw createError({ statusCode: 404, statusMessage: 'ไม่พบบทความ' })
  }

  const related = list.articles
    .filter((item) => item.slug !== article.slug)
    .sort((a, b) => {
      const aSame = a.category && a.category === article.category ? 0 : 1
      const bSame = b.category && b.category === article.category ? 0 : 1
      return aSame - bSame
    })
    .slice(0, 4)

  return {
    article,
    related,
    source,
  }
})
