import { ListUsers } from '@/domain/usecases'

export interface ListUsersRepository {
    list: () => Promise<ListUsersRepository.Result>
}

export namespace ListUsersRepository {
    export type Result = ListUsers.Result
}
