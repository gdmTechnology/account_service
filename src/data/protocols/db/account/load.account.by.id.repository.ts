import { LoadAccountById } from '@/domain/usecases'

export interface LoadAccountByIdRepository {
    loadAccountById: (identification: string) => Promise<LoadAccountById.Result | null>
}

export namespace LoadAccountByIdRepository {
    export type Result = LoadAccountById.Result
}
