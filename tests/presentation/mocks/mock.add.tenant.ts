import { AddTenant } from '@/domain/usecases'

export class AddTenantSpy implements AddTenant {
    input: any
    result: any = {
        tenantId: 'tenantId',
        companyName: 'companyName',
        companyEmail: 'companyEmail',
        companyTellphone: 'companyTellphone',
        companyCellphone: 'companyCellphone',
        companyCnpj: 'companyCnpj',
        companyAddress: 'companyAddress',
        companyState: 'companyState',
        companyNumber: 'companyNumber',
        companyDistrict: 'companyDistrict',
        companyCity: 'companyCity',
        createdAt: 'createdAt',
        updateAt: 'updateAt'
    }

    async handle(input: AddTenant.Request): Promise<AddTenant.Result> {
        this.input = input
        return this.result
    }
}
