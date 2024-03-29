import { LoadAccountByToken } from '@/domain/usecases'
import { ok, serverError, unauthorized } from '../helpers'
import { HttpResponse, Middleware } from '../protocols'

export class AuthenticationMiddleware implements Middleware {
    constructor(
        private readonly loadAccountByToken: LoadAccountByToken,
        private readonly role?: string
    ) { }

    async handle(httpRequest: AuthenticationMiddleware.Request): Promise<HttpResponse> {
        try {
            const { accessToken } = httpRequest
            if (accessToken) {
                const account = await this.loadAccountByToken.handle({ accessToken, role: this.role })
                if (account) return ok({ accountId: account.identification })
            }
            return unauthorized()
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace AuthenticationMiddleware {
    export type Request = {
        accessToken?: string
    }
}
