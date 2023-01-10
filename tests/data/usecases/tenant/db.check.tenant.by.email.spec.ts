
import { DbAddTenant } from '@/data/usecases'
import { AddTenant } from '@/domain/usecases'
import { CheckTenantByEmailRepositorySpy, CreateUuidSpy } from '@/tests/data/mocks'

const throwError = (): never => {
    throw new Error()
}

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
    createUuidSpy: CreateUuidSpy
    sut: DbAddTenant
}
const makeSut = (): SutTypes => {
    const checkTenantByEmailRepositorySpy = new CheckTenantByEmailRepositorySpy()
    const createUuidSpy = new CreateUuidSpy()
    const sut = new DbAddTenant(checkTenantByEmailRepositorySpy, createUuidSpy)
    return {
        checkTenantByEmailRepositorySpy,
        createUuidSpy,
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

    test('Should return false if CheckTenantByEmailRepository return a company', async () => {
        const { sut } = makeSut()
        const request = mockRequest()
        const response = await sut.handle(request)
        expect(response).toBeFalsy()
    })

    test('Should throw if CreateUuid throws', async () => {
        const { sut, checkTenantByEmailRepositorySpy, createUuidSpy } = makeSut()
        jest.spyOn(checkTenantByEmailRepositorySpy, 'check').mockReturnValue(null)
        jest.spyOn(createUuidSpy, 'create').mockImplementationOnce(throwError)
        const request = mockRequest()
        const promise = sut.handle(request)
        await expect(promise).rejects.toThrow()
    })
})
