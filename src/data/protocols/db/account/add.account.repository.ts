import { AddAccount } from '@/domain/usecases'

export interface AddAccountRepository {
    save: (data: AddAccountRepository.Params) => Promise<AddAccountRepository.Result>
}

export namespace AddAccountRepository {
    export type Params = AddAccount.Request
    export type Result = AddAccount.Result
}
