import { DeleteAccountController } from '@/presentation/controllers'
import { ValidationSpy, DeleteAccountSpy } from '../mocks'
import { serverError, ok, forbidden } from '@/presentation/helpers/http.helper'
import { EmailInUseError, NotFoundTenantError } from '@/presentation/errors'
import { Constants } from '@/helper'

const mockRequest = (): DeleteAccountController.Request => ({
    identification: 'identification'
})

const throwError = (): never => {
    throw new Error()
}

type SutTypes = {
    sut: DeleteAccountController
    validationSpy: ValidationSpy
    deleteAccountSpy: DeleteAccountSpy
}

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const deleteAccountSpy = new DeleteAccountSpy()
    const sut = new DeleteAccountController(validationSpy, deleteAccountSpy)
    return {
        validationSpy,
        deleteAccountSpy,
        sut
    }
}

describe('DeleteAccountController', () => {
    test('Should call validation with correct values', async () => {
        const { sut, validationSpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(validationSpy.input).toEqual(request)
    })

    test('Should return 400 if validation fails', async () => {
        const { sut, validationSpy } = makeSut()
        validationSpy.error = new Error()
        const request = mockRequest()
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(400)
    })

    test('Should return 500 if validation throw', async () => {
        const { sut, validationSpy } = makeSut()
        validationSpy.error = new Error()
        jest.spyOn(validationSpy, 'validate').mockImplementationOnce(throwError)
        const request = mockRequest()
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(500)
    })

    test('Should call deleteAccount with correct value', async () => {
        const { sut, deleteAccountSpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(deleteAccountSpy.input).toBe(request.identification)
    })
})
