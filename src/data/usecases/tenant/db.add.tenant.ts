import { AddTenant } from '@/domain/usecases'
import { AddTenantRepository, CheckTenantByEmailRepository } from '@/data/protocols/db'
import { CreateUuid } from '@/data/protocols'

export class DbAddTenant implements AddTenant {
    constructor(
        private readonly checkTenantByEmailRepository: CheckTenantByEmailRepository,
        private readonly createUuid: CreateUuid,
        private readonly addTenantRepository: AddTenantRepository
    ) { }

    async handle(data: AddTenant.Request): Promise<any> {
        const company = await this.checkTenantByEmailRepository.check(data.companyEmail)
        if (company) return !company
        const tenantId = this.createUuid.create()
        await this.addTenantRepository.save({ ...data, tenantId })
    }
}
