import { ListUsersController } from '@/presentation/controllers'
import { ListUsersSpy } from '@/tests/presentation/mocks'

type SutTypes = {
    listUsersSpy: ListUsersSpy
    sut: ListUsersController
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
})
