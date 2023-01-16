import { DbListUsers } from '@/data/usecases'
import { AccountMongoRepository } from '@/infra/db/mongodb'
import { ListUsers } from '@/domain/usecases'

export const makeDbListUsers = (): ListUsers => {
    const accountRepository = new AccountMongoRepository()
    return new DbListUsers(accountRepository)
}
