import { ListUsers, GetUser } from '@/domain/usecases'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { badRequest, ok, serverError } from '@/presentation/helpers'
import { Validation } from '@/presentation/protocols/validation'
import { NotFoundIdentificationError } from '@/presentation/errors'

export class GetUserController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly getUser: GetUser
    ) { }

    async handle(data: GetUserController.Request): Promise<any> {
        try {
            const error = this.validation.validate(data)
            if (error) {
                return badRequest(error)
            }
            const user = await this.getUser.handle(data)
            if (!user) return badRequest(new NotFoundIdentificationError())
            return ok(user)
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace GetUserController {
    export type Request = {
        identification: string
    }
}
