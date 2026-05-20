import { httpClient }                from './client'
import type { ShortUrlRepository }  from '../../domain/port/out/ShortUrlRepository'
import type { ShortUrl }            from '../../domain/model/ShortUrl'
import type { Page }                from '../../domain/model/Page'
import type { CreateShortUrlCommand, UpdateShortUrlCommand } from '../../domain/port/in/ShortUrlUseCase'
import { DomainError }              from '../../domain/error/DomainError'

export class HttpShortUrlRepository implements ShortUrlRepository {
  async create(command: CreateShortUrlCommand): Promise<ShortUrl> {
    try {
      const { data } = await httpClient.post<ShortUrl>('/urls', command)
      return data
    } catch (err: any) {
      throw new DomainError(err.response?.data?.message ?? 'Failed to create short URL', err.response?.status)
    }
  }

  async findAll(page: number, size: number): Promise<Page<ShortUrl>> {
    try {
      const { data } = await httpClient.get<Page<ShortUrl>>('/urls', {
        params: { page, size, sort: 'createdAt,desc' },
      })
      return data
    } catch (err: any) {
      throw new DomainError(err.response?.data?.message ?? 'Failed to load URLs', err.response?.status)
    }
  }

  async update(id: string, command: UpdateShortUrlCommand): Promise<ShortUrl> {
    try {
      const { data } = await httpClient.patch<ShortUrl>(`/urls/${id}`, command)
      return data
    } catch (err: any) {
      throw new DomainError(err.response?.data?.message ?? 'Failed to update URL', err.response?.status)
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await httpClient.delete(`/urls/${id}`)
    } catch (err: any) {
      throw new DomainError(err.response?.data?.message ?? 'Failed to delete URL', err.response?.status)
    }
  }

  async getAnalytics(id: string): Promise<ShortUrl> {
    try {
      const { data } = await httpClient.get<ShortUrl>(`/urls/${id}/analytics`)
      return data
    } catch (err: any) {
      throw new DomainError(err.response?.data?.message ?? 'Failed to load analytics', err.response?.status)
    }
  }
}
