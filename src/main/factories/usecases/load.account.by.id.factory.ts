import { LoadAccountById } from '@/domain/usecases'
import { DbLoadAccountById } from '@/data/usecases'
import { AccountMongoRepository } from '@/infra/db/mongodb'

export const makeDbLoadAccountById = (): LoadAccountById => {
    const loadAccountByIdRepository = new AccountMongoRepository()
    return new DbLoadAccountById(loadAccountByIdRepository)
}
