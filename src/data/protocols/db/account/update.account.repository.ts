import { UpdateAccount } from '@/domain/usecases'

export interface UpdateAccountRepository {
    update: (data: UpdateAccountRepository.Params) => Promise<UpdateAccount.Result>
}

export namespace UpdateAccountRepository {
    export type Params = UpdateAccount.Request
    export type Result = UpdateAccount.Result
}
