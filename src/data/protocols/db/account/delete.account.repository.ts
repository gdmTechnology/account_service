import { DeleteAccount } from '@/domain/usecases'

export interface DeleteAccountRepository {
    delete: (identification: string) => Promise<AddAccountRepository.Result>
}

export namespace AddAccountRepository {
    export type Result = DeleteAccount.Result
}
