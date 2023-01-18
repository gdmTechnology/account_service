import { GetUser } from '@/domain/usecases'
import { LoadAccountByIdRepository } from '@/data/protocols/db'

export class DbGetUser implements GetUser {
    constructor(
        private readonly loadAccountByIdRepository: LoadAccountByIdRepository
    ) { }

    async handle(data: GetUser.Request): Promise<GetUser.Result | null> {
        const exists = await this.loadAccountByIdRepository.loadAccountById(data.identification)
        return exists
    }
}
