import { UpdateAccount } from '@/domain/usecases'
import { CheckAccountByIdRepository, UpdateAccountRepository } from '@/data/protocols/db'

export class DbUpdateAccount implements UpdateAccount {
    constructor(
        private readonly checkAccountByIdRepository: CheckAccountByIdRepository,
        private readonly updateAccountRepository: UpdateAccountRepository
    ) { }

    async handle(data: UpdateAccount.Request): Promise<UpdateAccount.Result | boolean> {
        const exists = await this.checkAccountByIdRepository.checkAccountById(data.identification)
        if (!exists) return exists
        return await this.updateAccountRepository.update(data)
    }
}
