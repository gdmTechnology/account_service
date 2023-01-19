import { GetUser } from '@/domain/usecases'
import { DbGetUser } from '@/data/usecases'
import { AccountMongoRepository } from '@/infra/db/mongodb'

export const makeDbLoadAccountById = (): GetUser => {
    const loadAccountByIdRepository = new AccountMongoRepository()
    return new DbGetUser(loadAccountByIdRepository)
}
