import { resolveWebsiteArticles } from '../../utils/website-articles'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const category = typeof query.category === 'string' ? query.category.trim() : ''
  const { articles, source, total } = await resolveWebsiteArticles(event, category || undefined)
  return {
    count: articles.length,
    total,
    articles,
    source,
  }
})
