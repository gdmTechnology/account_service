import { CheckAccountByEmail } from '@/domain/usecases'

export interface CheckAccountByEmailRepository {
    checkAccountByEmail: (email: string) => Promise<CheckAccountByEmailRepository.Result>
}

export namespace CheckAccountByEmailRepository {
    export type Result = CheckAccountByEmail.Result
}
