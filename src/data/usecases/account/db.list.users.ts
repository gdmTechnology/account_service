import { ListUsersRepository } from '@/data/protocols'
import { ListUsers } from '@/domain/usecases'

export class DbListUsers implements ListUsers {
    constructor(
        private readonly listUsersRepository: ListUsersRepository
    ) { }

    async handle(): Promise<ListUsers.Result> {
        const users = this.listUsersRepository.list()
        return users
    }
}
