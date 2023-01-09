import { CreateTenantController } from '@/presentation/controllers'
import { ValidationSpy, AddTenantSpy } from '../mocks'

const mockRequest = (): CreateTenantController.Request => ({
    tenantId: 'valid_tenantId',
    companyName: 'valid_companyName',
    companyEmail: 'valid_companyEmail',
    companyTellphone: 'valid_companyTellphone',
    companyCellphone: 'valid_companyCellphone',
    companyCnpj: 'valid_companyCnpj',
    companyAddress: 'valid_companyAddress',
    companyState: 'valid_companyState',
    companyNumber: 'valid_companyNumber',
    companyDistrict: 'valid_companyDistrict',
    companyCity: 'valid_companyCity'
})

type SutTypes = {
    sut: CreateTenantController
    validationSpy: ValidationSpy
    addTenantSpy: AddTenantSpy
}

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const addTenantSpy = new AddTenantSpy()
    const sut = new CreateTenantController(validationSpy, addTenantSpy)
    return {
        validationSpy,
        addTenantSpy,
        sut
    }
}

describe('CreateTenantController', () => {
    test('Should call validation with correct values', async () => {
        const { sut, validationSpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(validationSpy.input).toEqual(request)
    })

    test('Should return 400 if Validation fails', async () => {
        const { sut, validationSpy } = makeSut()
        validationSpy.error = new Error()
        const request = mockRequest()
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(400)
    })

    test('Should call AddTenant with correct values', async () => {
        const { sut, addTenantSpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(addTenantSpy.input).toEqual(request)
    })
})
