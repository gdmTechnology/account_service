import { Controller } from '@/presentation/protocols/controller'
import { EmailInUseError, NotFoundTenantError } from '@/presentation/errors'
import { AddAccount, DeleteAccount } from '@/domain/usecases'
import { badRequest, serverError, forbidden, ok } from '@/presentation/helpers'
import { Validation } from '@/presentation/protocols/validation'
import { Constants } from '@/helper'

export class DeleteAccountController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly deleteAccount: DeleteAccount
    ) { }

    async handle(data: DeleteAccountController.Request): Promise<any> {
        try {
            const isError = this.validation.validate(data)
            if (isError) {
                return badRequest(isError)
            }
            await this.deleteAccount.handle(data.identification)
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace DeleteAccountController {
    export interface Request {
        identification: string
    }
}
