import type { ShortUrl } from '../../model/ShortUrl'
import type { Page }     from '../../model/Page'

export interface CreateShortUrlCommand {
  originalUrl:  string
  customAlias?: string
  expiresAt?:   string
}

export interface UpdateShortUrlCommand {
  originalUrl?: string
  customAlias?: string
  clearAlias?:  boolean
  expiresAt?:   string
  clearExpiry?: boolean
  active?:      boolean
}

export interface CreateShortUrlUseCase {
  create(command: CreateShortUrlCommand): Promise<ShortUrl>
}

export interface GetUserUrlsUseCase {
  getUrls(page: number, size: number): Promise<Page<ShortUrl>>
}

export interface UpdateShortUrlUseCase {
  update(id: string, command: UpdateShortUrlCommand): Promise<ShortUrl>
}

export interface DeleteShortUrlUseCase {
  delete(id: string): Promise<void>
}

export interface GetUrlAnalyticsUseCase {
  getAnalytics(id: string): Promise<ShortUrl>
}
