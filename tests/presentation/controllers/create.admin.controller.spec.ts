import { CreateAdminController } from '@/presentation/controllers'
import { ValidationSpy, AddAccountSpy, AuthSpy } from '../mocks'
import { serverError, ok, forbidden } from '@/presentation/helpers/http.helper'
import { AccessDeniedError } from '@/presentation/errors'
import { Constants } from '@/helper'

const birthDate = new Date('2017-02-02T12:54:59.218Z')

const mockRequest = (): CreateAdminController.Request => ({
    email: 'email',
    tenant: 'tenant',
    password: 'password',
    passwordConfirmation: 'passwordConfirmation',
    identification: 'identification',
    name: 'name',
    lastName: 'lastName',
    birthDate,
    tellphone: 'tellphone',
    cellphone: 'cellphone',
    streetAddress: 'streetAddress',
    numberAddress: 'numberAddress',
    districtAddress: 'districtAddress',
    cityAddress: 'cityAddress',
    stateAddress: 'stateAddress',
    accountId: 'accountId'
})

const throwError = (): never => {
    throw new Error()
}

type SutTypes = {
    sut: CreateAdminController
    validationSpy: ValidationSpy
    addAccountSpy: AddAccountSpy
    authSpy: AuthSpy
}

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const addAccountSpy = new AddAccountSpy()
    const authSpy = new AuthSpy()
    const sut = new CreateAdminController(validationSpy, addAccountSpy, authSpy)
    return {
        validationSpy,
        addAccountSpy,
        authSpy,
        sut
    }
}

describe('CreateAdminController', () => {
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

    test('Should call AddAccount with correct values', async () => {
        const { sut, addAccountSpy } = makeSut()
        const request = mockRequest()
        const { passwordConfirmation, ...rest } = request
        await sut.handle(request)
        expect(addAccountSpy.input).toEqual({ ...rest, role: 'admin' })
    })

    test('Should return 500 if AddAccount throws', async () => {
        const { sut, addAccountSpy } = makeSut()
        jest.spyOn(addAccountSpy, 'handle').mockImplementationOnce(throwError)
        const request = mockRequest()
        const response = await sut.handle(request)
        expect(response).toEqual(serverError(new Error()))
    })

    test('Should call Authentication with correct values', async () => {
        const { sut, authSpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(authSpy.input).toEqual({
            email: request.email,
            password: request.password
        })
    })

    test('Should return 500 if Authentication throws', async () => {
        const { sut, authSpy } = makeSut()
        jest.spyOn(authSpy, 'handle').mockImplementationOnce(throwError)
        const request = mockRequest()
        const response = await sut.handle(request)
        expect(response).toEqual(serverError(new Error()))
    })

    test('Should return 200 if AddAccount and Authentication pass', async () => {
        const { sut } = makeSut()
        const request = mockRequest()
        const { password, passwordConfirmation, accountId, ...rest } = request
        const response = await sut.handle(request)
        expect(response).toEqual(ok({ ...rest, accessToken: 'accessToken' }))
    })

    test('Should return 400 if email already is in use', async () => {
        const { sut, addAccountSpy } = makeSut()
        const request = mockRequest()
        jest.spyOn(addAccountSpy, 'handle').mockReturnValueOnce(new Promise((resolve, reject) => resolve(Constants.EmailInUseError)))
        const response = await sut.handle(request)
        expect(response.statusCode).toBe(400)
    })

    test('Should return 400 if not found tenant', async () => {
        const { sut, addAccountSpy } = makeSut()
        const request = mockRequest()
        jest.spyOn(addAccountSpy, 'handle').mockReturnValueOnce(new Promise((resolve, reject) => resolve(Constants.NotFoundTenantError)))
        const response = await sut.handle(request)
        expect(response.statusCode).toBe(400)
    })

    test('Should return 403 if admin is not authorized', async () => {
        const { sut, addAccountSpy } = makeSut()
        const request = mockRequest()
        jest.spyOn(addAccountSpy, 'handle').mockReturnValueOnce(new Promise((resolve, reject) => resolve(Constants.Forbidden)))
        const response = await sut.handle(request)
        expect(response).toEqual(forbidden(new AccessDeniedError()))
    })
})
