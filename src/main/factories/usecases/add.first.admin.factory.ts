import { DbAddFirstAdmin } from '@/data/usecases'
import { UuidGeneratorAdapter } from '@/infra/identificationGenerator'
import { BCryptAdapter } from '@/infra/cryptography'
import { AccountMongoRepository } from '@/infra/db/mongodb'
import { CreateAdmin } from '@/domain/usecases'

export const makeDbAddFirstAdmin = (): CreateAdmin => {
    const salt = 12
    const createUuid = new UuidGeneratorAdapter()
    const bcryptAdapter = new BCryptAdapter(salt)
    const accountMongoRepository = new AccountMongoRepository()
    return new DbAddFirstAdmin(createUuid, bcryptAdapter, accountMongoRepository, accountMongoRepository)
}
