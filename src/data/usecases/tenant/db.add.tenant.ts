import { AddTenant } from '@/domain/usecases'
import { CheckTenantByEmailRepository } from '@/data/protocols/db'
import { CreateUuid } from '@/data/protocols'

export class DbAddTenant implements AddTenant {
    constructor(
        private readonly checkTenantByEmailRepository: CheckTenantByEmailRepository,
        private readonly createUuid: CreateUuid
    ) { }

    async handle(data: AddTenant.Request): Promise<any> {
        const company = await this.checkTenantByEmailRepository.check(data.companyEmail)
        if (company) return !company
        this.createUuid.create()
    }
}
