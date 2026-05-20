import { httpClient }            from './client'
import type { AuthRepository }  from '../../domain/port/out/AuthRepository'
import type { AuthToken }       from '../../domain/model/Auth'
import { DomainError }          from '../../domain/error/DomainError'

export class HttpAuthRepository implements AuthRepository {
  async login(email: string, password: string): Promise<AuthToken> {
    try {
      const { data } = await httpClient.post<AuthToken>('/auth/login', { email, password })
      return data
    } catch (err: any) {
      throw new DomainError(
        err.response?.data?.message ?? 'Invalid credentials',
        err.response?.status,
      )
    }
  }

  async register(email: string, password: string): Promise<AuthToken> {
    try {
      const { data } = await httpClient.post<AuthToken>('/auth/register', { email, password })
      return data
    } catch (err: any) {
      throw new DomainError(
        err.response?.data?.message ?? 'Registration failed',
        err.response?.status,
      )
    }
  }
}
