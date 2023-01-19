import { GetUserController } from '@/presentation/controllers'
import { LoadAccountByIdSpy, ValidationSpy } from '@/tests/presentation/mocks'

type SutTypes = {
    loadAccountByIdSpy: LoadAccountByIdSpy
    validationSpy: ValidationSpy
    sut: GetUserController
}

const throwError = (): never => {
    throw new Error()
}

const makeSut = (): SutTypes => {
    const loadAccountByIdSpy = new LoadAccountByIdSpy()
    const validationSpy = new ValidationSpy()
    const sut = new GetUserController(validationSpy, loadAccountByIdSpy)
    return { sut, validationSpy, loadAccountByIdSpy }
}

const mockRequest = (): any => ({
    identification: 'identification'
})

describe('GetUserController', () => {
    test('Should call Validation with correct values', async () => {
        const { sut, validationSpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(validationSpy.input).toEqual(request)
    })
    test('Should return 400 if validation fail', async () => {
        const { sut, validationSpy } = makeSut()
        validationSpy.error = new Error()
        const request = mockRequest()
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(400)
    })
    test('Should return 500 if validation throw', async () => {
        const { sut, validationSpy } = makeSut()
        jest.spyOn(validationSpy, 'validate').mockImplementationOnce(throwError)
        const request = mockRequest()
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(500)
    })
    test('Should call GetUser with correct values', async () => {
        const { sut, loadAccountByIdSpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(loadAccountByIdSpy.input).toEqual(request)
    })
    test('Should return 400 if GetUser fail', async () => {
        const { sut, loadAccountByIdSpy } = makeSut()
        loadAccountByIdSpy.result = null
        const request = mockRequest()
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(400)
    })
    test('Should return 200 if GetUser succeds', async () => {
        const { sut } = makeSut()
        const request = mockRequest()
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(200)
    })
})
