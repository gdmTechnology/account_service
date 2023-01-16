import { Controller } from '@/presentation/protocols/controller'
import { EmailInUseError, NotFoundTenantError } from '@/presentation/errors'
import { AddAccount, Authentication } from '@/domain/usecases'
import { badRequest, serverError, forbidden, ok } from '@/presentation/helpers'
import { Validation } from '@/presentation/protocols/validation'
import { Constants } from '@/helper'

export class DeleteAccountController implements Controller {
    constructor(
        private readonly validation: Validation
    ) { }

    async handle(data: DeleteAccountController.Request): Promise<any> {
        this.validation.validate(data)
    }
}

export namespace DeleteAccountController {
    export interface Request {
        identification: string
    }
}
