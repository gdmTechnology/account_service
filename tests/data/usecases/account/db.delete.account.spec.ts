import { DbDeleteAccount } from '@/data/usecases'
import { LoadAccountByIdRepositorySpy } from '@/tests/data/mocks'

const throwError = (): never => {
    throw new Error()
}

const mockeRequest = (): string => 'identification'

type SutTypes = {
    sut: DbDeleteAccount
    loadAccountByIdRepositorySpy: LoadAccountByIdRepositorySpy
}

const makeSut = (): SutTypes => {
    const loadAccountByIdRepositorySpy = new LoadAccountByIdRepositorySpy()
    const sut = new DbDeleteAccount(
        loadAccountByIdRepositorySpy
    )
    return {
        loadAccountByIdRepositorySpy,
        sut
    }
}

describe('DbDeleteAccount Usecase', () => {
    test('Should call LoadAccountByIdRepository with correct values', async () => {
        const { sut, loadAccountByIdRepositorySpy } = makeSut()
        const request = mockeRequest()
        await sut.handle(request)
        expect(loadAccountByIdRepositorySpy.params).toBe(request)
    })

    test('Should return false if LoadAccountByIdRepository return null', async () => {
        const { sut } = makeSut()
        const request = mockeRequest()
        const result = await sut.handle(request)
        expect(result).toBeFalsy()
    })

    test('Should throw if LoadAccountByIdRepository throws', async () => {
        const { sut, loadAccountByIdRepositorySpy } = makeSut()
        jest.spyOn(loadAccountByIdRepositorySpy, 'loadAccountById').mockImplementationOnce(throwError)
        const request = mockeRequest()
        const promise = sut.handle(request)
        await expect(promise).rejects.toThrow()
    })
})
