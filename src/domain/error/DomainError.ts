export class DomainError extends Error {
  readonly status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.status = status
    this.name   = 'DomainError'
  }
}
