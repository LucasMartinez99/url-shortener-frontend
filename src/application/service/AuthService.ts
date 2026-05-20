import type { AuthRepository }         from '../../domain/port/out/AuthRepository'
import type { LoginUseCase, RegisterUseCase } from '../../domain/port/in/AuthUseCase'
import type { AuthToken }              from '../../domain/model/Auth'

export class AuthService implements LoginUseCase, RegisterUseCase {
  private readonly repo: AuthRepository
  constructor(repo: AuthRepository) { this.repo = repo }

  login(email: string, password: string): Promise<AuthToken> {
    return this.repo.login(email, password)
  }

  register(email: string, password: string): Promise<AuthToken> {
    return this.repo.register(email, password)
  }
}
