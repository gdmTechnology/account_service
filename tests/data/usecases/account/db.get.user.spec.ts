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
})
