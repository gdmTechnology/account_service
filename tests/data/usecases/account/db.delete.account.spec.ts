import { DbDeleteAccount } from '@/data/usecases'
import { DeleteAccountRepositorySpy } from '@/tests/data/mocks'

const throwError = (): never => {
    throw new Error()
}

const mockeRequest = (): string => 'identification'

type SutTypes = {
    sut: DbDeleteAccount
    deleteAccountRepositorySpy: DeleteAccountRepositorySpy
}

const makeSut = (): SutTypes => {
    const deleteAccountRepositorySpy = new DeleteAccountRepositorySpy()
    const sut = new DbDeleteAccount(
        deleteAccountRepositorySpy
    )
    return {
        deleteAccountRepositorySpy,
        sut
    }
}

describe('DbDeleteAccount Usecase', () => {
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

    test('Should throw if DeleteAccountRepository throws', async () => {
        const { sut, deleteAccountRepositorySpy } = makeSut()
        jest.spyOn(deleteAccountRepositorySpy, 'delete').mockImplementationOnce(throwError)
        const request = mockeRequest()
        const promise = sut.handle(request)
        await expect(promise).rejects.toThrow()
    })
})
