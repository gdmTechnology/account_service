import { DeleteAccount } from '@/domain/usecases'

export interface DeleteAccountRepository {
    delete: (identification: string) => Promise<DeleteAccountRepository.Result>
}

export namespace DeleteAccountRepository {
    export type Result = DeleteAccount.Result
}
