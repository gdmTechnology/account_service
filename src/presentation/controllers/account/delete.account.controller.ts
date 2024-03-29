import { Controller } from '@/presentation/protocols/controller'
import { NotFoundIdentificationError } from '@/presentation/errors'
import { DeleteAccount } from '@/domain/usecases'
import { badRequest, serverError, ok } from '@/presentation/helpers'
import { Validation } from '@/presentation/protocols/validation'
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
            const isDeleted = await this.deleteAccount.handle(data.identification)
            if (isDeleted) return ok(isDeleted)
            return badRequest(new NotFoundIdentificationError())
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
