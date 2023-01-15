import { Controller } from '@/presentation/protocols/controller'
import { EmailInUseError, NotFoundTenantError } from '@/presentation/errors'
import { AddAccount, Authentication } from '@/domain/usecases'
import { badRequest, serverError, forbidden, ok } from '@/presentation/helpers'
import { Validation } from '@/presentation/protocols/validation'
import { Constants } from '@/helper'

export class SignUpController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly addAccount: AddAccount,
        private readonly authentication: Authentication
    ) { }

    async handle(data: SignUpController.Request): Promise<any> {
        try {
            const error = this.validation.validate(data)
            if (error) {
                return badRequest(error)
            }
            const { passwordConfirmation, ...newAccount } = data
            const isValid = await this.addAccount.handle({ ...newAccount, role: null })

            if (isValid === Constants.EmailInUseError) {
                return forbidden(new EmailInUseError())
            } else if (isValid === Constants.NotFoundTenantError) {
                return forbidden(new NotFoundTenantError())
            }
            const { email, password } = data
            const auth = await this.authentication.handle({ email, password })
            return ok(auth)
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace SignUpController {
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
    }
}
