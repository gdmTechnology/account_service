import { AuthenticationMiddleware } from '@/presentation/middlewares'
import { LoadAccountByTokenSpy } from '../mocks'

type SutTypes = {
    loadAccountByTokenSpy: LoadAccountByTokenSpy
    sut: AuthenticationMiddleware
}

const mockRequest = (): AuthenticationMiddleware.Request => ({
    accessToken: 'any_accessToken'
})

const throwError = (): never => {
    throw new Error()
}

const makeSut = (): SutTypes => {
    const loadAccountByTokenSpy = new LoadAccountByTokenSpy()
    const role = 'any_role'
    const sut = new AuthenticationMiddleware(loadAccountByTokenSpy, role)
    return {
        loadAccountByTokenSpy,
        sut
    }
}
describe('Authentication Middleware', () => {
    test('Should call LoadAccountByTokenRepository with correct values', async () => {
        const { sut, loadAccountByTokenSpy } = makeSut()
        await sut.handle(mockRequest())
        expect(loadAccountByTokenSpy.params.accessToken).toBe('any_accessToken')
        expect(loadAccountByTokenSpy.params.role).toBe('any_role')
    })

    test('Should return 403 if no x-access-token exists in headers', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle({})
        expect(httpResponse.statusCode).toBe(403)
    })

    test('Should return 403 if LoadAccountByTokenRepository return null', async () => {
        const { sut, loadAccountByTokenSpy } = makeSut()
        loadAccountByTokenSpy.result = null
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse.statusCode).toBe(403)
    })

    test('Should return 200 if LoadAccountByTokenRepository return valid account', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse.statusCode).toBe(200)
    })

    test('Should return 500 if LoadAccountByTokenRepository throws', async () => {
        const { sut, loadAccountByTokenSpy } = makeSut()
        jest.spyOn(loadAccountByTokenSpy, 'handle').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse.statusCode).toBe(500)
    })
})
