import { fetchCmmsArticles } from '../../utils/cmms-posts'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const category = typeof query.category === 'string' ? query.category.trim() : ''
  const { articles, source, total } = await fetchCmmsArticles(event, {
    category: category || undefined,
  })
  return {
    count: articles.length,
    total,
    articles,
    source,
  }
})
