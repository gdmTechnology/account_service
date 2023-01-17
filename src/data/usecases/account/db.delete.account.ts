import { DeleteAccount } from '@/domain/usecases'
import { LoadAccountByIdRepository, DeleteAccountRepository } from '@/data/protocols/db'

export class DbDeleteAccount implements DeleteAccount {
    constructor(
        private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
        private readonly deleteAccountRepository: DeleteAccountRepository
    ) { }

    async handle(identification: string): Promise<any> {
        const account = await this.loadAccountByIdRepository.loadAccountById(identification)
        if (!account) return !!account
        await this.deleteAccountRepository.delete(identification)
    }
}
