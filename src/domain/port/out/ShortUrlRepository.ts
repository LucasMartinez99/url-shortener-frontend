import type { ShortUrl }            from '../../model/ShortUrl'
import type { Page }                from '../../model/Page'
import type { CreateShortUrlCommand, UpdateShortUrlCommand } from '../in/ShortUrlUseCase'

export interface ShortUrlRepository {
  create(command: CreateShortUrlCommand): Promise<ShortUrl>
  findAll(page: number, size: number): Promise<Page<ShortUrl>>
  update(id: string, command: UpdateShortUrlCommand): Promise<ShortUrl>
  remove(id: string): Promise<void>
  getAnalytics(id: string): Promise<ShortUrl>
}
