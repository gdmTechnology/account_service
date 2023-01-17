import { DbDeleteAccount } from '@/data/usecases'
import { LoadAccountByIdRepositorySpy, DeleteAccountRepositorySpy } from '@/tests/data/mocks'

const throwError = (): never => {
    throw new Error()
}

const mockeRequest = (): string => 'identification'

type SutTypes = {
    sut: DbDeleteAccount
    loadAccountByIdRepositorySpy: LoadAccountByIdRepositorySpy
    deleteAccountRepositorySpy: DeleteAccountRepositorySpy
}

const makeSut = (): SutTypes => {
    const loadAccountByIdRepositorySpy = new LoadAccountByIdRepositorySpy()
    const deleteAccountRepositorySpy = new DeleteAccountRepositorySpy()
    const sut = new DbDeleteAccount(
        loadAccountByIdRepositorySpy,
        deleteAccountRepositorySpy
    )
    return {
        loadAccountByIdRepositorySpy,
        deleteAccountRepositorySpy,
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

    test('Should call DeleteAccountRepository with correct values', async () => {
        const { sut, deleteAccountRepositorySpy } = makeSut()
        const request = mockeRequest()
        await sut.handle(request)
        expect(deleteAccountRepositorySpy.params).toBe(request)
    })

    test('Should return false if DeleteAccountRepository return null', async () => {
        const { sut } = makeSut()
        const request = mockeRequest()
        const result = await sut.handle(request)
        expect(result).toBeFalsy()
    })

    test('Should return true if DeleteAccountRepository return true', async () => {
        const { sut, deleteAccountRepositorySpy } = makeSut()
        deleteAccountRepositorySpy.result = true
        const request = mockeRequest()
        const result = await sut.handle(request)
        expect(result).toBeTruthy()
    })
})
