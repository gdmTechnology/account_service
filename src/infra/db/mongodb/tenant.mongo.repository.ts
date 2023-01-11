import { AddTenantRepository } from '@/data/protocols'
import { TenantModel } from './models'

export class TenantMongoRepository implements AddTenantRepository {
    async save(data: AddTenantRepository.Params): Promise<AddTenantRepository.Result> {
        const model = new TenantModel(data)
        const result = await model.save()
        return result
    }
}
