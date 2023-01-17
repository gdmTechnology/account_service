import { DeleteAccount } from '@/domain/usecases'
import { LoadAccountByIdRepository, DeleteAccountRepository } from '@/data/protocols/db'
import { Constants } from '@/helper'

export class DbDeleteAccount implements DeleteAccount {
    constructor(
        private readonly loadAccountByIdRepository: LoadAccountByIdRepository
        // private readonly addAccountRepository: LoadAccountByIdRepository
    ) { }

    async handle(identification: string): Promise<any> {
        const account = await this.loadAccountByIdRepository.loadAccountById(identification)
        if (!account) return !!account
    }
}
