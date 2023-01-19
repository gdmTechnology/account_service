import { DbLoadAccountById } from '@/data/usecases'
import { LoadAccountById } from '@/domain/usecases'
import { LoadAccountByIdRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
    loadAccountByIdRepositorySpy: LoadAccountByIdRepositorySpy
    sut: DbLoadAccountById
}

const throwError = (): never => {
    throw new Error()
}

const makeSut = (): SutTypes => {
    const loadAccountByIdRepositorySpy = new LoadAccountByIdRepositorySpy()
    const sut = new DbLoadAccountById(loadAccountByIdRepositorySpy)
    return { sut, loadAccountByIdRepositorySpy }
}

const mockRequest = (): LoadAccountById.Request => ({
    identification: 'identification'
})

describe('DbLoadAccountById', () => {
    test('Should call LoadAccountByIdRepositorySpy with correct values', async () => {
        const { sut, loadAccountByIdRepositorySpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(loadAccountByIdRepositorySpy.params).toEqual(request.identification)
    })
    test('Should throw if LoadAccountByIdRepositorySpy throws', async () => {
        const { sut, loadAccountByIdRepositorySpy } = makeSut()
        const request = mockRequest()
        jest.spyOn(loadAccountByIdRepositorySpy, 'loadAccountById').mockImplementationOnce(throwError)
        const promise = sut.handle(request)
        await expect(promise).rejects.toThrow()
    })
    test('Should return false if LoadAccountByIdRepositorySpy return null', async () => {
        const { sut, loadAccountByIdRepositorySpy } = makeSut()
        const request = mockRequest()
        loadAccountByIdRepositorySpy.result = null
        const result = await sut.handle(request)
        expect(result).toBeFalsy()
    })
    test('Should return account if LoadAccountByIdRepositorySpy succeds', async () => {
        const { sut } = makeSut()
        const request = mockRequest()
        const result = await sut.handle(request)
        expect(result).toHaveProperty('identification')
    })
})
