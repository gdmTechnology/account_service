import { DbDeleteAccount } from '@/data/usecases'
import { AccountMongoRepository } from '@/infra/db/mongodb'
import { DeleteAccount } from '@/domain/usecases'

export const makeDbDeleteAccount = (): DeleteAccount => {
    const accountMongoRepository = new AccountMongoRepository()
    return new DbDeleteAccount(accountMongoRepository)
}
