import { AddTenantRepository, CheckTenantByEmailRepository, LoadTenantRepository } from '@/data/protocols'
import { TenantModel } from './models'

export class TenantMongoRepository implements AddTenantRepository, CheckTenantByEmailRepository, LoadTenantRepository {
    async save(data: AddTenantRepository.Params): Promise<AddTenantRepository.Result> {
        const model = new TenantModel(data)
        const result = await model.save()
        return result
    }

    async check(companyEmail: string): Promise<CheckTenantByEmailRepository.Result> {
        return await TenantModel.findOne({ companyEmail }).lean()
    }

    async load(tenantId: string): Promise<LoadTenantRepository.Result> {
        return await TenantModel.findOne({ tenantId }).lean()
    }
}
