import { AddTenant } from '@/domain/usecases'
import { AddTenantRepository, CheckTenantByEmailRepository } from '@/data/protocols/db'
import { CreateUuid } from '@/data/protocols'

export class DbAddTenant implements AddTenant {
    constructor(
        private readonly checkTenantByEmailRepository: CheckTenantByEmailRepository,
        private readonly createUuid: CreateUuid,
        private readonly addTenantRepository: AddTenantRepository
    ) { }

    async handle(data: AddTenant.Request): Promise<AddTenant.Result> {
        const hasCompany = await this.checkTenantByEmailRepository.check(data.companyEmail)
        if (hasCompany) return null
        const tenantId = this.createUuid.create()
        const company = await this.addTenantRepository.save({ ...data, tenantId })
        return company
    }
}
