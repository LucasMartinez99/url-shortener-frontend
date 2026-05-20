export interface ShortUrl {
  id:             string
  originalUrl:    string
  shortCode:      string
  customAlias:    string | null
  shortUrl:       string
  expiresAt:      string | null
  createdAt:      string
  lastAccessedAt: string | null
  clickCount:     number
  active:         boolean
}
