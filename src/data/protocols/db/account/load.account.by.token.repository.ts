import { LoadAccountByToken } from '@/domain/usecases'

export interface LoadAccountByTokenRepository {
    load: (data: LoadAccountByTokenRepository.Params) => Promise<LoadAccountByTokenRepository.Result>
}

export namespace LoadAccountByTokenRepository {
    export type Params = LoadAccountByToken.Request
    export type Result = LoadAccountByToken.Result | null
}
