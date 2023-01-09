import { AddAccount } from '@/domain/usecases'
import { Hasher, CreateUuid } from '@/data/protocols/cryptography'
import { AddAccountRepository, CheckAccountByEmailRepository } from '@/data/protocols/db'

export class DbAddAccount implements AddAccount {
    constructor(
        private readonly createUuid: CreateUuid,
        private readonly hasher: Hasher,
        private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
        private readonly addAccountRepository: AddAccountRepository
    ) { }

    async handle(data: AddAccount.Request): Promise<AddAccount.Result> {
        const existsAcc = await this.checkAccountByEmailRepository.checkAccountByEmail(data.email)
        let isValid = false
        if (!existsAcc) {
            const hashedPassword = await this.hasher.hash(data.password)
            const identification = this.createUuid.create()
            isValid = await this.addAccountRepository.save({ ...data, identification, password: hashedPassword })
        }
        return isValid
    }
}
