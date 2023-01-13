import { CreateAdmin } from '@/domain/usecases'
import { Hasher, CreateUuid } from '@/data/protocols/cryptography'
import { AddAccountRepository, CheckAccountByEmailRepository } from '@/data/protocols/db'
import { Constants } from '@/helper'

export class DbAddFirstAdmin implements CreateAdmin {
    constructor(
        private readonly createUuid: CreateUuid,
        private readonly hasher: Hasher,
        private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
        private readonly addAccountRepository: AddAccountRepository
    ) { }

    async handle(data: CreateAdmin.Request): Promise<CreateAdmin.Result> {
        const existsAcc = await this.checkAccountByEmailRepository.checkAccountByEmail(data.email)
        if (existsAcc) return Constants.EmailInUseError

        const hashedPassword = await this.hasher.hash(data.password)
        const identification = this.createUuid.create()
        const account = await this.addAccountRepository.save({ ...data, tenant: '', identification, password: hashedPassword })
        return account
    }
}
