import { AddTenantRepository, CheckTenantByEmailRepository, LoadTenantRepository } from '@/data/protocols'
import { TenantModel } from './models'

export class TenantMongoRepository implements AddTenantRepository, CheckTenantByEmailRepository, LoadTenantRepository {
    async save(data: AddTenantRepository.Params): Promise<AddTenantRepository.Result> {
        const model = new TenantModel(data)
        const result = await model.save()
        return result
    }

    async check(email: string): Promise<CheckTenantByEmailRepository.Result> {
        return await TenantModel.findOne({ email }).lean()
    }

    async load(tenant: string): Promise<LoadTenantRepository.Result> {
        return await TenantModel.findOne({ tenant }).lean()
    }
}
