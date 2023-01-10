
import { DbAddTenant } from '@/data/usecases'
import { AddTenant } from '@/domain/usecases'
import { CheckTenantByEmailRepositorySpy, CreateUuidSpy, AddTenantRepositorySpy } from '@/tests/data/mocks'

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
    addTenantRepositorySpy: AddTenantRepositorySpy
    sut: DbAddTenant
}
const makeSut = (): SutTypes => {
    const checkTenantByEmailRepositorySpy = new CheckTenantByEmailRepositorySpy()
    const createUuidSpy = new CreateUuidSpy()
    const addTenantRepositorySpy = new AddTenantRepositorySpy()
    const sut = new DbAddTenant(checkTenantByEmailRepositorySpy, createUuidSpy, addTenantRepositorySpy)
    return {
        checkTenantByEmailRepositorySpy,
        createUuidSpy,
        addTenantRepositorySpy,
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

    test('Should call AddTenantRepositorySpy with correct values', async () => {
        const { sut, addTenantRepositorySpy, checkTenantByEmailRepositorySpy } = makeSut()
        jest.spyOn(checkTenantByEmailRepositorySpy, 'check').mockReturnValue(null)
        const request = mockRequest()
        await sut.handle(request)
        expect(addTenantRepositorySpy.params).toEqual({ ...request, tenantId: 'any_id' })
    })

    test('Should return valid account if AddTenantRepositorySpy succeds', async () => {
        const { sut, checkTenantByEmailRepositorySpy } = makeSut()
        jest.spyOn(checkTenantByEmailRepositorySpy, 'check').mockReturnValue(null)
        const request = mockRequest()
        const company = await sut.handle(request)
        expect(company).toHaveProperty('tenantId')
        expect(company).toBeDefined()
    })
})
