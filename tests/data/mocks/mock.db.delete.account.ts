import { DeleteAccountRepository } from '@/data/protocols/db'

export class DeleteAccountRepositorySpy implements DeleteAccountRepository {
    params: any
    result: any = false
    async delete(identification: string): Promise<DeleteAccountRepository.Result> {
        this.params = identification
        return this.result
    }
}
