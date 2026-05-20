import type { AuthToken } from '../../model/Auth'

export interface LoginUseCase {
  login(email: string, password: string): Promise<AuthToken>
}

export interface RegisterUseCase {
  register(email: string, password: string): Promise<AuthToken>
}
