import env from '@/main/config/env'
import { CreateAdmin } from '@/domain/usecases'
import { DbCreateAdmin } from '@/data/usecases'
import { CheckAccountByEmailRepositorySpy, AddAccountRepositorySpy, HasherSpy, CreateUuidSpy, LoadAccountByIdRepositorySpy } from '@/tests/data/mocks'
import { Constants } from '@/helper'

const throwError = (): never => {
    throw new Error()
}

const accountId = 'accountId'

const mockeRequest = (): CreateAdmin.Request => ({
    email: env.adminEmail,
    password: 'password',
    identification: 'any_id',
    tenant: '',
    name: 'name',
    lastName: 'lastName',
    birthDate: new Date(),
    tellphone: 'tellphone',
    cellphone: 'cellphone',
    streetAddress: 'streetAddress',
    numberAddress: 'numberAddress',
    districtAddress: 'districtAddress',
    cityAddress: 'cityAddress',
    stateAddress: 'stateAddress',
    role: 'admin'
})

const mockReturn = (): any => ({
    email: 'invalid_email',
    name: 'name',
    lastName: 'lastName',
    identification: 'identification',
    birthDate: 'birthDate',
    tellphone: 'tellphone',
    cellphone: 'cellphone',
    streetAddress: 'streetAddress',
    numberAddress: 'numberAddress',
    districtAddress: 'districtAddress',
    cityAddress: 'cityAddress',
    stateAddress: 'stateAddress',
    accessToken: 'accessToken'
})

type SutTypes = {
    sut: DbCreateAdmin
    createUuidSpy: CreateUuidSpy
    hasherSpy: HasherSpy
    addAccountRepositorySpy: AddAccountRepositorySpy
    loadAccountByIdRepositorySpy: LoadAccountByIdRepositorySpy
    checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
    const createUuidSpy = new CreateUuidSpy()
    const hasherSpy = new HasherSpy()
    const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
    const loadAccountByIdRepositorySpy = new LoadAccountByIdRepositorySpy()
    const addAccountRepositorySpy = new AddAccountRepositorySpy()
    const sut = new DbCreateAdmin(
        createUuidSpy,
        hasherSpy,
        checkAccountByEmailRepositorySpy,
        loadAccountByIdRepositorySpy,
        addAccountRepositorySpy
    )
    return {
        createUuidSpy,
        hasherSpy,
        checkAccountByEmailRepositorySpy,
        loadAccountByIdRepositorySpy,
        addAccountRepositorySpy,
        sut
    }
}

describe('DbCreateAdmin Usecase', () => {
    test('Should call CheckAccountByEmailRepository with correct values ', async () => {
        const { sut, checkAccountByEmailRepositorySpy } = makeSut()
        await sut.handle(mockeRequest(), accountId)
        expect(checkAccountByEmailRepositorySpy.params).toBe(mockeRequest().email)
    })
    test('Should throw if CheckAccountByEmailRepository throws', async () => {
        const { sut, checkAccountByEmailRepositorySpy } = makeSut()
        jest.spyOn(checkAccountByEmailRepositorySpy, 'checkAccountByEmail').mockImplementationOnce(throwError)
        const promise = sut.handle(mockeRequest(), accountId)
        await expect(promise).rejects.toThrow()
    })
    test('Should return error if CheckAccountByEmailRepository return a valid account', async () => {
        const { sut, checkAccountByEmailRepositorySpy } = makeSut()
        jest.spyOn(checkAccountByEmailRepositorySpy, 'checkAccountByEmail').mockReturnValueOnce(new Promise(resolve => resolve(true)))
        const response = await sut.handle(mockeRequest(), accountId)
        expect(response).toBe(Constants.EmailInUseError)
    })
    test('Should call Hasher with correct plaintext', async () => {
        const { sut, hasherSpy } = makeSut()
        await sut.handle(mockeRequest(), accountId)
        expect(hasherSpy.plaintext).toBe(mockeRequest().password)
    })
    test('Should throw if Hasher throws', async () => {
        const { sut, hasherSpy } = makeSut()
        jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError)
        const promise = sut.handle(mockeRequest(), accountId)
        await expect(promise).rejects.toThrow()
    })
    test('Should call AddAccountRepository with correct values ', async () => {
        const { sut, addAccountRepositorySpy, hasherSpy } = makeSut()
        const request = mockeRequest()
        await sut.handle(request, accountId)
        expect(addAccountRepositorySpy.params).toEqual({ ...request, tenant: '', password: hasherSpy.digest })
    })
    test('Should throw if AddAccountRepository throws', async () => {
        const { sut, addAccountRepositorySpy } = makeSut()
        const request = mockeRequest()
        jest.spyOn(addAccountRepositorySpy, 'save').mockImplementationOnce(throwError)
        const promise = sut.handle(request, accountId)
        await expect(promise).rejects.toThrow()
    })
    test('Should throw if CreateUuid throws', async () => {
        const { sut, createUuidSpy } = makeSut()
        jest.spyOn(createUuidSpy, 'create').mockImplementationOnce(throwError)
        const promise = sut.handle(mockeRequest(), accountId)
        await expect(promise).rejects.toThrow()
    })

    test('Should call LoadAccountByIdRepository with correct values ', async () => {
        const { sut, loadAccountByIdRepositorySpy } = makeSut()
        const request = mockeRequest()
        await sut.handle(request, accountId)
        expect(loadAccountByIdRepositorySpy.params).toEqual(accountId)
    })

    test('Should throw if LoadAccountByIdRepository throws', async () => {
        const { sut, loadAccountByIdRepositorySpy } = makeSut()
        jest.spyOn(loadAccountByIdRepositorySpy, 'loadAccountById').mockImplementationOnce(throwError)
        const promise = sut.handle(mockeRequest(), accountId)
        await expect(promise).rejects.toThrow()
    })

    test('Should return ForbiddenError if LoadAccountByIdRepository return null', async () => {
        const { sut, loadAccountByIdRepositorySpy } = makeSut()
        jest.spyOn(loadAccountByIdRepositorySpy, 'loadAccountById').mockReturnValueOnce(null)
        const response = await sut.handle(mockeRequest(), accountId)
        expect(response).toBe(Constants.Forbidden)
    })

    test('Should return ForbiddenError if LoadAccountByIdRepository return account that cant create admin users', async () => {
        const { sut, loadAccountByIdRepositorySpy } = makeSut()
        jest.spyOn(loadAccountByIdRepositorySpy, 'loadAccountById').mockReturnValueOnce(mockReturn())
        const response = await sut.handle(mockeRequest(), accountId)
        expect(response).toBe(Constants.Forbidden)
    })
})
