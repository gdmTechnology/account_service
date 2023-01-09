import { AddAccount } from '@/domain/usecases'

export class AddAccountSpy implements AddAccount {
    input: any
    async handle(input: AddAccount.Request): Promise<AddAccount.Result> {
        this.input = input
        return this.input
    }
}
