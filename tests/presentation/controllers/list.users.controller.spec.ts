import { ListUsersController } from '@/presentation/controllers'
import { ListUsersSpy } from '@/tests/presentation/mocks'

type SutTypes = {
    listUsersSpy: ListUsersSpy
    sut: ListUsersController
}

const throwError = (): never => {
    throw new Error()
}

const makeSut = (): SutTypes => {
    const listUsersSpy = new ListUsersSpy()
    const sut = new ListUsersController(listUsersSpy)
    return { sut, listUsersSpy }
}

describe('ListUsersController', () => {
    test('Should return 200 if ListUsers succeds', async () => {
        const { sut } = makeSut()
        const company = await sut.handle()
        expect(company.statusCode).toEqual(200)
    })

    test('Should return 500 if ListUsers throws', async () => {
        const { sut, listUsersSpy } = makeSut()
        jest.spyOn(listUsersSpy, 'handle').mockImplementationOnce(throwError)
        const users = await sut.handle()
        expect(users.statusCode).toEqual(500)
    })
})
