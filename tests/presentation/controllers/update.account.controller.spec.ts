import { UpdateAccountController } from '@/presentation/controllers'
import { UpdateAccountSpy, ValidationSpy } from '../mocks'
import { badRequest } from '../helpers/http.helper'

const throwError = (): never => {
    throw new Error()
}

const mockRequest = (): UpdateAccountController.Request => ({
    identification: 'identification',
    name: 'name',
    lastName: 'lastName',
    birthDate: new Date(),
    tellphone: 'tellphone',
    cellphone: 'cellphone',
    streetAddress: 'streetAddress',
    numberAddress: 'numberAddress',
    districtAddress: 'districtAddress',
    cityAddress: 'cityAddress',
    stateAddress: 'stateAddress'
})

type SutTypes = {
    validationSpy: ValidationSpy
    updateAccountSpy: UpdateAccountSpy
    sut: UpdateAccountController
}

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const updateAccountSpy = new UpdateAccountSpy()
    const sut = new UpdateAccountController(validationSpy, updateAccountSpy)
    return {
        validationSpy,
        updateAccountSpy,
        sut
    }
}

describe('UpdateAccountController', () => {
    test('Should call validation with correct values', async () => {
        const { sut, validationSpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(validationSpy.input).toEqual(request)
    })
    test('Should return 400 if Validation fails', async () => {
        const { sut, validationSpy } = makeSut()
        const request = mockRequest()
        validationSpy.error = new Error()
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(400)
    })
    test('Should call UpdateAccount with correct values', async () => {
        const { sut, updateAccountSpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(updateAccountSpy.input).toEqual(request)
    })
    test('Should return 500 if UpdateAccount throws', async () => {
        const { sut, updateAccountSpy } = makeSut()
        const request = mockRequest()
        jest.spyOn(updateAccountSpy, 'handle').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(500)
    })

    test('Should return 200 if update is successful', async () => {
        const { sut } = makeSut()
        const request = mockRequest()
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(200)
    })

    test('Should return 400 if UpdateAccount return false', async () => {
        const { sut, updateAccountSpy } = makeSut()
        const request = mockRequest()
        jest.spyOn(updateAccountSpy, 'handle').mockReturnValueOnce(new Promise((resolve) => resolve(false)))
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(400)
    })
})
