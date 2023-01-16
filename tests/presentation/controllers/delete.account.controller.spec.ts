import { DeleteAccountController } from '@/presentation/controllers'
import { ValidationSpy } from '../mocks'
import { serverError, ok, forbidden } from '@/presentation/helpers/http.helper'
import { EmailInUseError, NotFoundTenantError } from '@/presentation/errors'
import { Constants } from '@/helper'

const mockRequest = (): DeleteAccountController.Request => ({
    identification: 'id'
})

const throwError = (): never => {
    throw new Error()
}

type SutTypes = {
    sut: DeleteAccountController
    validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const sut = new DeleteAccountController(validationSpy)
    return {
        validationSpy,
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
})
