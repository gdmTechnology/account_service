import { DeleteAccount } from '@/domain/usecases'

export class DeleteAccountSpy implements DeleteAccount {
    input: any
    result = true
    async handle(input: string): Promise<DeleteAccount.Result> {
        this.input = input
        return this.result
    }
}
