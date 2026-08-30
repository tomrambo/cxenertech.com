import { fetchCmmsArticleBySlug, fetchCmmsArticles } from '../../utils/cmms-posts'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing article slug' })
  }

  const [{ article, source }, list] = await Promise.all([
    fetchCmmsArticleBySlug(event, slug),
    fetchCmmsArticles(event).catch(() => ({ articles: [] })),
  ])

  if (!article) {
    throw createError({ statusCode: 404, statusMessage: 'ไม่พบบทความ' })
  }

  const related = list.articles
    .filter((item) => item.slug !== article.slug)
    .slice(0, 4)

  return {
    article,
    related,
    source,
  }
})
