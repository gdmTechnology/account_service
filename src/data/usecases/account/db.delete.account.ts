import { DeleteAccount } from '@/domain/usecases'
import { DeleteAccountRepository } from '@/data/protocols/db'

export class DbDeleteAccount implements DeleteAccount {
    constructor(
        private readonly deleteAccountRepository: DeleteAccountRepository
    ) { }

    async handle(identification: string): Promise<DeleteAccount.Result> {
        const isDeleted = await this.deleteAccountRepository.delete(identification)
        return isDeleted
    }
}
