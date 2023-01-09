import { AuthenticationController } from '@/presentation/controllers'
import { ValidationSpy, AuthSpy } from '../mocks'

const throwError = (): never => {
    throw new Error()
}

const mockRequest = (): AuthenticationController.Request => ({
    email: 'email',
    password: 'password'
})

type SutTypes = {
    validationSpy: ValidationSpy
    authSpy: AuthSpy
    sut: AuthenticationController
}

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const authSpy = new AuthSpy()
    const sut = new AuthenticationController(validationSpy, authSpy)
    return {
        validationSpy,
        authSpy,
        sut
    }
}

describe('AuthenticationController', () => {
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

    test('Should call Authentication with correct values', async () => {
        const { sut, authSpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(authSpy.input).toEqual(request)
    })

    test('Should return 500 if Authentication throws', async () => {
        const { sut, authSpy } = makeSut()
        jest.spyOn(authSpy, 'handle').mockImplementationOnce(throwError)
        const request = mockRequest()
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(500)
    })

    test('Should return 401 if Authentication fail', async () => {
        const { sut, authSpy } = makeSut()
        authSpy.result = null
        const request = mockRequest()
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(401)
    })

    test('Should return 200 if Authentication succeeds', async () => {
        const { sut } = makeSut()
        const request = mockRequest()
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(200)
    })
})
