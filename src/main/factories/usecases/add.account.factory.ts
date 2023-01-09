import { DbAddAccount } from '@/data/usecases'
import { UuidGeneratorAdapter } from '@/infra/identificationGenerator'
import { BCryptAdapter } from '@/infra/cryptography'
import { AccountMongoRepository } from '@/infra/db/mongodb'
import { AddAccount } from '@/domain/usecases'

export const makeDbAddAccount = (): AddAccount => {
    const salt = 12
    const createUuid = new UuidGeneratorAdapter()
    const bcryptAdapter = new BCryptAdapter(salt)
    const accountMongoRepository = new AccountMongoRepository()
    return new DbAddAccount(createUuid, bcryptAdapter, accountMongoRepository, accountMongoRepository)
}
