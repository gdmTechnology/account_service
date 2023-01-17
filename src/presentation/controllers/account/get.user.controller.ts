import { ListUsers, GetUser } from '@/domain/usecases'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { ok, serverError } from '@/presentation/helpers'

export class GetUserController implements Controller {
    constructor(
        private readonly getUser: GetUser
    ) { }

    async handle(data: GetUserController.Request): Promise<any> {
        // try {
        const user = await this.getUser.handle(data)
        //     return ok(users)
        // } catch (error) {
        //     return serverError(error)
        // }
    }
}

export namespace GetUserController {
    export type Request = {
        identification: string
    }
}
