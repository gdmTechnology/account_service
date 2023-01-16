import { Controller } from '@/presentation/protocols/controller'
import { AccessDeniedError, EmailInUseError, NotFoundTenantError } from '@/presentation/errors'
import { CreateAdmin, Authentication } from '@/domain/usecases'
import { badRequest, serverError, forbidden, ok } from '@/presentation/helpers'
import { Validation } from '@/presentation/protocols/validation'
import { Constants } from '@/helper'
import { HttpResponse } from '@/presentation/protocols'

export class CreateAdminController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly addAccount: CreateAdmin,
        private readonly authentication: Authentication
    ) { }

    async handle(data: CreateAdminController.Request): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(data)
            if (error) {
                return badRequest(error)
            }
            const { passwordConfirmation, ...newAccount } = data

            const isValid = await this.addAccount.handle({ ...newAccount, role: 'admin' }, data.accountId)
            if (isValid === Constants.EmailInUseError) {
                return forbidden(new EmailInUseError())
            } else if (isValid === Constants.NotFoundTenantError) {
                return forbidden(new NotFoundTenantError())
            } else if (isValid === Constants.Forbidden) {
                return forbidden(new AccessDeniedError())
            }
            const { email, password } = data
            const auth = await this.authentication.handle({ email, password })
            return ok(auth)
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace CreateAdminController {
    export interface Request {
        email: string
        password: string
        tenant: string
        passwordConfirmation: string
        identification: string
        name: string
        lastName: string
        birthDate: Date
        tellphone: string
        cellphone: string
        streetAddress: string
        numberAddress: string
        districtAddress: string
        cityAddress: string
        stateAddress: string
        accountId: string
    }
}
