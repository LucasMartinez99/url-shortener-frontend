import { HttpAuthRepository }     from '../http/HttpAuthRepository'
import { HttpShortUrlRepository } from '../http/HttpShortUrlRepository'
import { AuthService }            from '../../application/service/AuthService'
import { ShortUrlService }        from '../../application/service/ShortUrlService'

const authRepository     = new HttpAuthRepository()
const shortUrlRepository = new HttpShortUrlRepository()

export const authService     = new AuthService(authRepository)
export const shortUrlService = new ShortUrlService(shortUrlRepository)
