import { AddAccount } from '@/domain/usecases'
import { DbAddAccount } from '@/data/usecases'
import { CheckAccountByEmailRepositorySpy, AddAccountRepositorySpy, HasherSpy, CreateUuidSpy, LoadTenantRepositorySpy } from '@/tests/data/mocks'

const throwError = (): never => {
    throw new Error()
}

const mockeRequest = (): AddAccount.Request => ({
    email: 'email',
    tenant: 'tenant',
    password: 'password',
    identification: 'any_id',
    name: 'name',
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
    sut: DbAddAccount
    createUuidSpy: CreateUuidSpy
    hasherSpy: HasherSpy
    addAccountRepositorySpy: AddAccountRepositorySpy
    checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
    loadTenantRepositorySpy: LoadTenantRepositorySpy
}

const makeSut = (): SutTypes => {
    const createUuidSpy = new CreateUuidSpy()
    const hasherSpy = new HasherSpy()
    const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
    const addAccountRepositorySpy = new AddAccountRepositorySpy()
    const loadTenantRepositorySpy = new LoadTenantRepositorySpy()
    const sut = new DbAddAccount(
        createUuidSpy,
        hasherSpy,
        checkAccountByEmailRepositorySpy,
        addAccountRepositorySpy,
        loadTenantRepositorySpy
    )
    return {
        createUuidSpy,
        hasherSpy,
        checkAccountByEmailRepositorySpy,
        addAccountRepositorySpy,
        loadTenantRepositorySpy,
        sut
    }
}

describe('DbAddAccount Usecase', () => {
    test('Should call CheckAccountByEmailRepository with correct values ', async () => {
        const { sut, checkAccountByEmailRepositorySpy } = makeSut()
        await sut.handle(mockeRequest())
        expect(checkAccountByEmailRepositorySpy.params).toBe(mockeRequest().email)
    })
    test('Should throw if CheckAccountByEmailRepository throws', async () => {
        const { sut, checkAccountByEmailRepositorySpy } = makeSut()
        jest.spyOn(checkAccountByEmailRepositorySpy, 'checkAccountByEmail').mockImplementationOnce(throwError)
        const promise = sut.handle(mockeRequest())
        await expect(promise).rejects.toThrow()
    })
    test('Should call Hasher with correct plaintext', async () => {
        const { sut, hasherSpy } = makeSut()
        await sut.handle(mockeRequest())
        expect(hasherSpy.plaintext).toBe(mockeRequest().password)
    })
    test('Should throw if Hasher throws', async () => {
        const { sut, hasherSpy } = makeSut()
        jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError)
        const promise = sut.handle(mockeRequest())
        await expect(promise).rejects.toThrow()
    })
    test('Should call AddAccountRepository with correct values ', async () => {
        const { sut, addAccountRepositorySpy, hasherSpy } = makeSut()
        const request = mockeRequest()
        await sut.handle(request)
        expect(addAccountRepositorySpy.params).toEqual({ ...request, password: hasherSpy.digest })
    })
    test('Should throw if AddAccountRepository throws', async () => {
        const { sut, addAccountRepositorySpy } = makeSut()
        const request = mockeRequest()
        jest.spyOn(addAccountRepositorySpy, 'save').mockImplementationOnce(throwError)
        const promise = sut.handle(request)
        await expect(promise).rejects.toThrow()
    })
    test('Should throw if CreateUuid throws', async () => {
        const { sut, createUuidSpy } = makeSut()
        jest.spyOn(createUuidSpy, 'create').mockImplementationOnce(throwError)
        const promise = sut.handle(mockeRequest())
        await expect(promise).rejects.toThrow()
    })

    test('Should call LoadTenantRepository with correct values', async () => {
        const { sut, loadTenantRepositorySpy } = makeSut()
        await sut.handle(mockeRequest())
        expect(loadTenantRepositorySpy.params).toBe('tenant')
    })

    test('Should return a valid company if LoadTenantRepository succeds', async () => {
        const { sut, loadTenantRepositorySpy } = makeSut()
        await sut.handle(mockeRequest())
        expect(loadTenantRepositorySpy.result).toBeDefined()
        expect(loadTenantRepositorySpy.result).toHaveProperty('companyCnpj')
    })

    test('Should return false if LoadTenantRepository return null', async () => {
        const { sut, loadTenantRepositorySpy } = makeSut()
        jest.spyOn(loadTenantRepositorySpy, 'load').mockImplementationOnce(null)
        const response = await sut.handle(mockeRequest())
        expect(response).toBeFalsy()
    })
})
