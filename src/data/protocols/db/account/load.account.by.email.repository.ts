import { LoadAccountByEmail } from '@/domain/usecases'

export interface LoadAccountByEmailRepository {
    loadAccountByEmail: (email: string) => Promise<LoadAccountByEmail.Result>
}

export namespace LoadAccountByEmailRepository {
    export type Result = LoadAccountByEmail.Result
}
