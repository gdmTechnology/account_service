import { AddTenantRepository, CheckTenantByEmailRepository } from '@/data/protocols'
import { TenantModel } from './models'

export class TenantMongoRepository implements AddTenantRepository, CheckTenantByEmailRepository {
    async save(data: AddTenantRepository.Params): Promise<AddTenantRepository.Result> {
        const model = new TenantModel(data)
        const result = await model.save()
        return result
    }

    async check(email: string): Promise<CheckTenantByEmailRepository.Result> {
        return await TenantModel.findOne({ email }).lean()
    }
}
