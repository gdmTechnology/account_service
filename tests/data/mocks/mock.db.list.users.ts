import { ListUsersRepository } from '@/data/protocols/db'

export class ListUsersRepositorySpy implements ListUsersRepository {
    result: any = []
    async list(): Promise<ListUsersRepository.Result> {
        return this.result
    }
}
