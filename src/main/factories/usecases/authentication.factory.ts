import env from '@/main/config/env'
import { DbAuthentication } from '@/data/usecases'
import { BCryptAdapter, JwtAdapter } from '@/infra/cryptography'
import { AccountMongoRepository } from '@/infra/db/mongodb'
import { Authentication } from '@/domain/usecases'

export const makeDbAuthentication = (): Authentication => {
    const salt = 12
    const accountMongoRepository = new AccountMongoRepository()
    const bcryptAdapter = new BCryptAdapter(salt)
    const jwtAdapter = new JwtAdapter(env.jwtSecret)
    return new DbAuthentication(accountMongoRepository, accountMongoRepository, bcryptAdapter, jwtAdapter)
}
