import { ListUsers } from '@/domain/usecases'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { ok, serverError } from '@/presentation/helpers'

export class ListUsersController implements Controller {
    constructor(
        private readonly listUsers: ListUsers
    ) { }

    async handle(): Promise<HttpResponse> {
        try {
            const users = await this.listUsers.handle()
            return ok(users)
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace ListUsersController {
    export type Request = {

    }
}
