import type { AuthToken } from '../../model/Auth'

export interface AuthRepository {
  login(email: string, password: string): Promise<AuthToken>
  register(email: string, password: string): Promise<AuthToken>
}
