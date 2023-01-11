import { DbAddTenant } from '@/data/usecases'
import { UuidGeneratorAdapter } from '@/infra/identificationGenerator'
import { TenantMongoRepository } from '@/infra/db/mongodb'
import { AddTenant } from '@/domain/usecases'

export const makeDbAddTenant = (): AddTenant => {
    const tenantMongoRepository = new TenantMongoRepository()
    const createUuid = new UuidGeneratorAdapter()
    return new DbAddTenant(tenantMongoRepository, createUuid, tenantMongoRepository)
}
