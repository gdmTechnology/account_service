import { UpdateAccessToken } from '@/domain/usecases'

export interface UpdateAccessTokenRepository {
    updateAccessToken: (data: UpdateAccessTokenRepository.Params) => Promise<UpdateAccessTokenRepository.Result>
}

export namespace UpdateAccessTokenRepository {
    export type Params = UpdateAccessToken.Request
    export type Result = UpdateAccessToken.Result
}
