import { CheckAccountById } from '@/domain/usecases'

export interface CheckAccountByIdRepository {
    checkAccountById: (identification: string) => Promise<CheckAccountByIdRepository.Result>
}

export namespace CheckAccountByIdRepository {
    export type Result = CheckAccountById.Result
}
