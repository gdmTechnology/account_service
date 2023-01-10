import { AddTenant } from '@/domain/usecases'
import { CheckTenantByEmailRepository } from '@/data/protocols/db'

export class DbAddTenant implements AddTenant {
    constructor(
        private readonly checkTenantByEmailRepository: CheckTenantByEmailRepository
    ) { }

    async handle(data: AddTenant.Request): Promise<any> {
        await this.checkTenantByEmailRepository.check(data.companyEmail)
    }
}
