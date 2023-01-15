import { CreateFirstAdmin } from '@/domain/usecases'
import { DbAddFirstAdmin } from '@/data/usecases'
import { CheckAccountByEmailRepositorySpy, AddAccountRepositorySpy, HasherSpy, CreateUuidSpy } from '@/tests/data/mocks'
import { Constants } from '@/helper'

const throwError = (): never => {
    throw new Error()
}

const mockeRequest = (): CreateFirstAdmin.Request => ({
    email: 'email',
    password: 'password',
    tenant: 'tenant',
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
    stateAddress: 'stateAddress',
    role: 'admin'
})

type SutTypes = {
    sut: DbAddFirstAdmin
    createUuidSpy: CreateUuidSpy
    hasherSpy: HasherSpy
    addAccountRepositorySpy: AddAccountRepositorySpy
    checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
    const createUuidSpy = new CreateUuidSpy()
    const hasherSpy = new HasherSpy()
    const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
    const addAccountRepositorySpy = new AddAccountRepositorySpy()
    const sut = new DbAddFirstAdmin(
        createUuidSpy,
        hasherSpy,
        checkAccountByEmailRepositorySpy,
        addAccountRepositorySpy
    )
    return {
        createUuidSpy,
        hasherSpy,
        checkAccountByEmailRepositorySpy,
        addAccountRepositorySpy,
        sut
    }
}

describe('DbAddFirstAdmin Usecase', () => {
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
    test('Should return error if CheckAccountByEmailRepository return a valid account', async () => {
        const { sut, checkAccountByEmailRepositorySpy } = makeSut()
        jest.spyOn(checkAccountByEmailRepositorySpy, 'checkAccountByEmail').mockReturnValueOnce(new Promise(resolve => resolve(true)))
        const response = await sut.handle(mockeRequest())
        expect(response).toBe(Constants.EmailInUseError)
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
        expect(addAccountRepositorySpy.params).toEqual({ ...request, tenant: '', password: hasherSpy.digest })
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
})
