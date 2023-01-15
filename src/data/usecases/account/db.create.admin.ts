import env from '@/main/config/env'
import { CreateAdmin } from '@/domain/usecases'
import { Hasher, CreateUuid } from '@/data/protocols/cryptography'
import { AddAccountRepository, CheckAccountByEmailRepository, LoadAccountByIdRepository } from '@/data/protocols/db'
import { Constants } from '@/helper'

export class DbCreateAdmin implements CreateAdmin {
    constructor(
        private readonly createUuid: CreateUuid,
        private readonly hasher: Hasher,
        private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
        private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
        private readonly addAccountRepository: AddAccountRepository
    ) { }

    async handle(data: CreateAdmin.Request, adminId: string): Promise<CreateAdmin.Result> {
        const existsAcc = await this.checkAccountByEmailRepository.checkAccountByEmail(data.email)
        if (existsAcc) return Constants.EmailInUseError

        const checkAdmin = await this.loadAccountByIdRepository.loadAccountById(adminId)
        if (!checkAdmin || checkAdmin.email !== env.adminEmail) return Constants.Forbidden

        const hashedPassword = await this.hasher.hash(data.password)
        const identification = this.createUuid.create()
        const admin = await this.addAccountRepository.save({ ...data, identification, password: hashedPassword })
        return admin
    }
}
