
import { DbAddTenant } from '@/data/usecases'
import { AddTenant } from '@/domain/usecases'
import { CheckTenantByEmailRepositorySpy } from '@/tests/data/mocks'

const mockRequest = (): AddTenant.Request => ({
    companyName: 'companyName',
    companyEmail: 'companyEmail',
    companyTellphone: 'companyTellphone',
    companyCellphone: 'companyCellphone',
    companyCnpj: 'companyCnpj',
    companyAddress: 'companyAddress',
    companyState: 'companyState',
    companyNumber: 'companyNumber',
    companyDistrict: 'companyDistrict',
    companyCity: 'companyCity'
})

type SutTypes = {
    checkTenantByEmailRepositorySpy: CheckTenantByEmailRepositorySpy
    sut: DbAddTenant
}
const makeSut = (): SutTypes => {
    const checkTenantByEmailRepositorySpy = new CheckTenantByEmailRepositorySpy()
    const sut = new DbAddTenant(checkTenantByEmailRepositorySpy)
    return {
        checkTenantByEmailRepositorySpy,
        sut
    }
}

describe('DbAddTenant', () => {
    test('Should call CheckTenantByEmailRepository with correct values', async () => {
        const { sut, checkTenantByEmailRepositorySpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(checkTenantByEmailRepositorySpy.params).toEqual(request.companyEmail)
    })
})
