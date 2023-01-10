import { AddTenant } from '@/domain/usecases'
import { CheckTenantByEmailRepository } from '@/data/protocols/db'

export class DbAddTenant implements AddTenant {
    constructor(
        private readonly checkTenantByEmailRepository: CheckTenantByEmailRepository
    ) { }

    async handle(data: AddTenant.Request): Promise<any> {
        const company = await this.checkTenantByEmailRepository.check(data.companyEmail)
        if (company) return !company
    }
}
