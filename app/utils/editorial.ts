export type EditorialInfo = {
  sources?: { title: string; url: string; accessedAt: string }[]
  reviewerName?: string
  reviewedAt?: string
  reviewStatus?: 'pending' | 'reviewed' | 'needs_update'
}
