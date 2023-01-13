import { AddAccount } from '@/domain/usecases'
import { Hasher, CreateUuid } from '@/data/protocols/cryptography'
import { AddAccountRepository, CheckAccountByEmailRepository, LoadTenantRepository } from '@/data/protocols/db'
import { Constants } from '@/helper'

export class DbAddAccount implements AddAccount {
    constructor(
        private readonly createUuid: CreateUuid,
        private readonly hasher: Hasher,
        private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
        private readonly addAccountRepository: AddAccountRepository,
        private readonly loadTenantRepository: LoadTenantRepository
    ) { }

    async handle(data: AddAccount.Request): Promise<AddAccount.Result> {
        const existsAcc = await this.checkAccountByEmailRepository.checkAccountByEmail(data.email)
        if (existsAcc) return Constants.EmailInUseError

        const existsTenant = await this.loadTenantRepository.load(data.tenant)
        if (!existsTenant) return Constants.NotFoundTenantError

        const hashedPassword = await this.hasher.hash(data.password)
        const identification = this.createUuid.create()
        const account = await this.addAccountRepository.save({ ...data, identification, password: hashedPassword })
        return account
    }
}
