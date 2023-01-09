import { UpdateAccount } from '@/domain/usecases'

export class UpdateAccountSpy implements UpdateAccount {
    input: any
    async handle(input: UpdateAccount.Request): Promise<UpdateAccount.Result | boolean> {
        this.input = input
        return this.input
    }
}
