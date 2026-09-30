import { fetchFloodMarketplace } from '../../utils/flood-marketplace'

export default defineEventHandler(async (event) => {
  const catalog = await fetchFloodMarketplace(event)
  return catalog
})
