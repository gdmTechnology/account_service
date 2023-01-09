import { Controller } from '@/presentation/protocols/controller'
import { Validation } from '../protocols/validation'
import { badRequest, serverError, ok } from '../helpers/http.helper'
import { UserNotFoundError } from '@/presentation/errors'
import { UpdateAccount } from '@/domain/usecases'

export class UpdateAccountController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly updateAccount: UpdateAccount
    ) { }

    async handle(data: UpdateAccountController.Request): Promise<any> {
        try {
            const error = this.validation.validate(data)
            if (error) return badRequest(error)
            const accountResult = await this.updateAccount.handle(data)
            if (!accountResult) return badRequest(new UserNotFoundError())
            return ok(accountResult)
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace UpdateAccountController {
    export interface Request {
        identification: string
        email?: string
        password?: string
        name?: string
        lastName?: string
        birthDate?: Date
        tellphone?: string
        cellphone?: string
        streetAddress?: string
        numberAddress?: string
        districtAddress?: string
        cityAddress?: string
        stateAddress?: string
    }
}
