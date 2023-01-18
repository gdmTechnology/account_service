import { GetUser } from '@/domain/usecases'
import { CheckAccountByIdRepository } from '@/data/protocols/db'

export class DbGetUser implements GetUser {
    constructor(
        private readonly checkAccountByIdRepository: CheckAccountByIdRepository
        // private readonly getUserRepository: GetUserRepository
    ) { }

    async handle(data: GetUser.Request): Promise<any> {
        const exists = await this.checkAccountByIdRepository.checkAccountById(data.identification)
        // if (!exists) return exists
        // return await this.updateAccountRepository.update(data)
    }
}
