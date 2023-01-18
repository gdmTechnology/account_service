import { GetUser } from '@/domain/usecases'
import { LoadAccountByIdRepository } from '@/data/protocols/db'

export class DbGetUser implements GetUser {
    constructor(
        private readonly loadAccountByIdRepository: LoadAccountByIdRepository
        // private readonly getUserRepository: GetUserRepository
    ) { }

    async handle(data: GetUser.Request): Promise<any> {
        const exists = await this.loadAccountByIdRepository.loadAccountById(data.identification)
        if (!exists) return exists
        // return await this.updateAccountRepository.update(data)
    }
}
