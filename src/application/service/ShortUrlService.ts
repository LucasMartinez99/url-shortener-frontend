import type { ShortUrlRepository }   from '../../domain/port/out/ShortUrlRepository'
import type {
  CreateShortUrlUseCase,
  GetUserUrlsUseCase,
  UpdateShortUrlUseCase,
  DeleteShortUrlUseCase,
  GetUrlAnalyticsUseCase,
  CreateShortUrlCommand,
  UpdateShortUrlCommand,
} from '../../domain/port/in/ShortUrlUseCase'
import type { ShortUrl } from '../../domain/model/ShortUrl'
import type { Page }     from '../../domain/model/Page'

export class ShortUrlService
  implements
    CreateShortUrlUseCase,
    GetUserUrlsUseCase,
    UpdateShortUrlUseCase,
    DeleteShortUrlUseCase,
    GetUrlAnalyticsUseCase
{
  private readonly repo: ShortUrlRepository
  constructor(repo: ShortUrlRepository) { this.repo = repo }

  create(command: CreateShortUrlCommand): Promise<ShortUrl> {
    return this.repo.create(command)
  }

  getUrls(page: number, size: number): Promise<Page<ShortUrl>> {
    return this.repo.findAll(page, size)
  }

  update(id: string, command: UpdateShortUrlCommand): Promise<ShortUrl> {
    return this.repo.update(id, command)
  }

  delete(id: string): Promise<void> {
    return this.repo.remove(id)
  }

  getAnalytics(id: string): Promise<ShortUrl> {
    return this.repo.getAnalytics(id)
  }
}
