import { Authentication } from '@/domain/usecases'

export interface AuthenticationRepository {
    authentication: (data: AuthenticationRepository.Params) => Promise<AuthenticationRepository.Result>
}

export namespace AuthenticationRepository {
    export type Params = Authentication.Request
    export type Result = Authentication.Result
}
