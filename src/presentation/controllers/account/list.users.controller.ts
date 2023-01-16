import { ListUsers } from '@/domain/usecases'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { ok } from '@/presentation/helpers'

export class ListUsersController implements Controller {
    constructor(
        private readonly listUsers: ListUsers
    ) { }

    async handle(): Promise<HttpResponse> {
        const users = await this.listUsers.handle()
        return ok(users)
    }
}

export namespace ListUsersController {
    export type Request = {

    }
}
