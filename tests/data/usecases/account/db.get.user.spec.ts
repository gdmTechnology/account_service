import { DbGetUser } from '@/data/usecases'
import { GetUser } from '@/domain/usecases'
import { CheckAccountByIdRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
    checkAccountByIdRepositorySpy: CheckAccountByIdRepositorySpy
    sut: DbGetUser
}

const throwError = (): never => {
    throw new Error()
}

const makeSut = (): SutTypes => {
    const checkAccountByIdRepositorySpy = new CheckAccountByIdRepositorySpy()
    const sut = new DbGetUser(checkAccountByIdRepositorySpy)
    return { sut, checkAccountByIdRepositorySpy }
}

const mockRequest = (): GetUser.Request => ({
    identification: 'identification'
})

describe('DbGetUser', () => {
    test('Should call CheckAccountByIdRepository with correct values', async () => {
        const { sut, checkAccountByIdRepositorySpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(checkAccountByIdRepositorySpy.params).toEqual(request.identification)
    })
    test('Should throw if CheckAccountByIdRepository throws', async () => {
        const { sut, checkAccountByIdRepositorySpy } = makeSut()
        const request = mockRequest()
        jest.spyOn(checkAccountByIdRepositorySpy, 'checkAccountById').mockImplementationOnce(throwError)
        const promise = sut.handle(request)
        await expect(promise).rejects.toThrow()
    })
    test('Should return false if CheckAccountByIdRepository return null', async () => {
        const { sut } = makeSut()
        const request = mockRequest()
        const result = await sut.handle(request)
        expect(result).toBeFalsy()
    })
})
