import { GetUserController } from '@/presentation/controllers'
import { GetUserSpy, ValidationSpy } from '@/tests/presentation/mocks'

type SutTypes = {
    getUserSpy: GetUserSpy
    validationSpy: ValidationSpy
    sut: GetUserController
}

const throwError = (): never => {
    throw new Error()
}

const makeSut = (): SutTypes => {
    const getUserSpy = new GetUserSpy()
    const validationSpy = new ValidationSpy()
    const sut = new GetUserController(validationSpy, getUserSpy)
    return { sut, validationSpy, getUserSpy }
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
        const { sut, getUserSpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(getUserSpy.input).toEqual(request)
    })

    // test('Should return 200 if GetUser succeds', async () => {
    //     const { sut } = makeSut()
    //     const request = mockRequest()
    //     const user = await sut.handle(request)
    //     expect(user.statusCode).toEqual(200)
    // })

    // test('Should return 500 if ListUsers throws', async () => {
    //     const { sut, listUsersSpy } = makeSut()
    //     jest.spyOn(listUsersSpy, 'handle').mockImplementationOnce(throwError)
    //     const users = await sut.handle()
    //     expect(users.statusCode).toEqual(500)
    // })
})
