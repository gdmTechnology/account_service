import { AddAccount } from '@/domain/usecases'
import { DbAuthentication } from '@/data/usecases'
import { LoadAccountByEmailRepositorySpy, UpdateAccessTokenRepositorySpy, HashComparerSpy, EncryptSpy } from '@/tests/data/mocks'

const throwError = (): never => {
    throw new Error()
}

const mockeRequest = (): AddAccount.Request => ({
    email: 'email',
    password: 'password',
    name: 'name',
    identification: 'identification',
    lastName: 'lastName',
    birthDate: new Date(),
    tellphone: 'tellphone',
    cellphone: 'cellphone',
    streetAddress: 'streetAddress',
    numberAddress: 'numberAddress',
    districtAddress: 'districtAddress',
    cityAddress: 'cityAddress',
    stateAddress: 'stateAddress'
})

type SutTypes = {
    sut: DbAuthentication
    loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
    updateAccessTokenRepositorySpy: UpdateAccessTokenRepositorySpy
    hashComparerSpy: HashComparerSpy
    encryptSpy: EncryptSpy
}

const makeSut = (): SutTypes => {
    const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
    const updateAccessTokenRepositorySpy = new UpdateAccessTokenRepositorySpy()
    const hashComparerSpy = new HashComparerSpy()
    const encryptSpy = new EncryptSpy()
    const sut = new DbAuthentication(loadAccountByEmailRepositorySpy, updateAccessTokenRepositorySpy, hashComparerSpy, encryptSpy)
    return {
        loadAccountByEmailRepositorySpy,
        updateAccessTokenRepositorySpy,
        hashComparerSpy,
        encryptSpy,
        sut
    }
}

describe('DbAuthentication Usecase', () => {
    test('Should call LoadAccountByEmailRepository with correct value', async () => {
        const { sut, loadAccountByEmailRepositorySpy } = makeSut()
        await sut.handle(mockeRequest())
        expect(loadAccountByEmailRepositorySpy.params).toBe(mockeRequest().email)
    })
    test('Should throw if LoadAccountByEmailRepository throws', async () => {
        const { sut, loadAccountByEmailRepositorySpy } = makeSut()
        jest.spyOn(loadAccountByEmailRepositorySpy, 'loadAccountByEmail').mockImplementationOnce(throwError)
        const promise = sut.handle(mockeRequest())
        await expect(promise).rejects.toThrow()
    })
    test('Should call HashComparer with correct value', async () => {
        const { sut, hashComparerSpy } = makeSut()
        await sut.handle(mockeRequest())
        expect(hashComparerSpy.hash).toBe(mockeRequest().password)
    })
    test('Should throw if HashComparer throws', async () => {
        const { sut, hashComparerSpy } = makeSut()
        jest.spyOn(hashComparerSpy, 'compare').mockImplementationOnce(throwError)
        const promise = sut.handle(mockeRequest())
        await expect(promise).rejects.toThrow()
    })
    test('Should call Encrypt with correct value', async () => {
        const { sut, encryptSpy, loadAccountByEmailRepositorySpy } = makeSut()
        await sut.handle(mockeRequest())
        expect(encryptSpy.param).toBe(loadAccountByEmailRepositorySpy.result.identification)
    })
    test('Should throw if Encrypt throws', async () => {
        const { sut, encryptSpy } = makeSut()
        jest.spyOn(encryptSpy, 'encrypt').mockImplementationOnce(throwError)
        const promise = sut.handle(mockeRequest())
        await expect(promise).rejects.toThrow()
    })
    test('Should call UpdateAccessTokenRepository with correct value', async () => {
        const { sut, updateAccessTokenRepositorySpy, encryptSpy } = makeSut()
        await sut.handle(mockeRequest())
        expect(updateAccessTokenRepositorySpy.params).toEqual({ identification: mockeRequest().identification, accessToken: encryptSpy.result })
    })

    test('Should throw if UpdateAccessTokenRepository throws', async () => {
        const { sut, updateAccessTokenRepositorySpy } = makeSut()
        jest.spyOn(updateAccessTokenRepositorySpy, 'updateAccessToken').mockImplementationOnce(throwError)
        const promise = sut.handle(mockeRequest())
        await expect(promise).rejects.toThrow()
    })
})
