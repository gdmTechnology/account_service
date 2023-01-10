import { CheckTenantByEmailRepository, AddTenantRepository } from '@/data/protocols/db'

export class CheckTenantByEmailRepositorySpy implements CheckTenantByEmailRepository {
    params: any
    result: any = true
    async check(email: string): Promise<CheckTenantByEmailRepository.Result> {
        this.params = email
        return this.result
    }
}

export class AddTenantRepositorySpy implements AddTenantRepository {
    params: any
    result: any = {
        tenantId: 'any_id',
        companyAddress: 'companyAddress',
        companyCellphone: 'companyCellphone',
        companyCity: 'companyCity',
        companyCnpj: 'companyCnpj',
        companyDistrict: 'companyDistrict',
        companyEmail: 'companyEmail',
        companyName: 'companyName',
        companyNumber: 'companyNumber',
        companyState: 'companyState',
        companyTellphone: 'companyTellphone',
        companyIsActived: true,
        createdAt: 'createdAt',
        updateAt: 'updateAt'
    }

    async save(data: AddTenantRepository.Params): Promise<AddTenantRepository.Result> {
        this.params = data
        return this.result
    }
}
