import { UpdateAccount } from '@/domain/usecases'
import { DbUpdateAccount } from '@/data/usecases'
import { CheckAccountByIdRepositorySpy, UpdateAccountRepositorySpy } from '@/tests/data/mocks'

const throwError = (): never => {
    throw new Error()
}

const mockeRequest = (): UpdateAccount.Request => ({
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
    sut: DbUpdateAccount
    checkAccountByIdRepositorySpy: CheckAccountByIdRepositorySpy
    updateAccountRepositorySpy: UpdateAccountRepositorySpy
}

const makeSut = (): SutTypes => {
    const checkAccountByIdRepositorySpy = new CheckAccountByIdRepositorySpy()
    const updateAccountRepositorySpy = new UpdateAccountRepositorySpy()
    const sut = new DbUpdateAccount(checkAccountByIdRepositorySpy, updateAccountRepositorySpy)
    return {
        checkAccountByIdRepositorySpy,
        updateAccountRepositorySpy,
        sut
    }
}

describe('DbUpdateAccount Usecase', () => {
    test('Should call CheckAccountByIdRepositorySpy with correct values', async () => {
        const { sut, checkAccountByIdRepositorySpy } = makeSut()
        await sut.handle(mockeRequest())
        expect(checkAccountByIdRepositorySpy.params).toBe(mockeRequest().identification)
    })

    test('Should throw if CheckAccountByIdRepository throws', async () => {
        const { sut, checkAccountByIdRepositorySpy } = makeSut()
        jest.spyOn(checkAccountByIdRepositorySpy, 'checkAccountById').mockImplementationOnce(throwError)
        const promise = sut.handle(mockeRequest())
        await expect(promise).rejects.toThrow()
    })

    test('Should throw if CheckAccountByIdRepository throws', async () => {
        const { sut, checkAccountByIdRepositorySpy } = makeSut()
        jest.spyOn(checkAccountByIdRepositorySpy, 'checkAccountById').mockImplementationOnce(throwError)
        const promise = sut.handle(mockeRequest())
        await expect(promise).rejects.toThrow()
    })

    test('Should return false if CheckAccountByIdRepository return false', async () => {
        const { sut } = makeSut()
        const result = await sut.handle(mockeRequest())
        expect(result).toBeFalsy()
    })

    test('Should call UpdateAccountRepository with correct values', async () => {
        const { sut, checkAccountByIdRepositorySpy, updateAccountRepositorySpy } = makeSut()
        const request = mockeRequest()
        jest.spyOn(checkAccountByIdRepositorySpy, 'checkAccountById').mockReturnValueOnce(new Promise(resolve => resolve(true)))
        await sut.handle(mockeRequest())
        expect(updateAccountRepositorySpy.params).toEqual(request)
    })

    test('Should return updated account if UpdateAccountRepository returns account updated', async () => {
        const { sut, checkAccountByIdRepositorySpy } = makeSut()
        const request = mockeRequest()
        jest.spyOn(checkAccountByIdRepositorySpy, 'checkAccountById').mockReturnValueOnce(new Promise(resolve => resolve(true)))
        const updatedAccount = await sut.handle(request)
        expect(updatedAccount).toEqual(
            {
                identification: 'any_id',
                name: 'updated_name',
                lastName: 'updated_lastName',
                tellphone: 'updated_tellphone',
                cellphone: 'updated_cellphone',
                streetAddress: 'updated_streetAddress',
                numberAddress: 'updated_numberAddress',
                districtAddress: 'updated_districtAddress',
                cityAddress: 'updated_cityAddress',
                stateAddress: 'updated_stateAddress'
            }
        )
    })

    test('Should return updated account if UpdateAccountRepository returns account updated', async () => {
        const { sut, checkAccountByIdRepositorySpy, updateAccountRepositorySpy } = makeSut()
        const request = mockeRequest()
        jest.spyOn(checkAccountByIdRepositorySpy, 'checkAccountById').mockReturnValueOnce(new Promise(resolve => resolve(true)))
        jest.spyOn(updateAccountRepositorySpy, 'update').mockImplementationOnce(throwError)
        const promise = sut.handle(request)
        await expect(promise).rejects.toThrow()
    })
})
