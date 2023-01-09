import { UpdateAccount } from '@/domain/usecases'
import { DbUpdateAccount } from '@/data/usecases'
import { AccountMongoRepository } from '@/infra/db/mongodb'

export const makeDbUpdateAccount = (): UpdateAccount => {
    const checkAccountByIdRepository = new AccountMongoRepository()
    const updateAccountRepository = new AccountMongoRepository()
    return new DbUpdateAccount(checkAccountByIdRepository, updateAccountRepository)
}
