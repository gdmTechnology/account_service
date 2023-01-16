import { } from '@/domain/usecases'
import { DbListUsers } from '@/data/usecases'
import { ListUsersRepositorySpy } from '@/tests/data/mocks'

const throwError = (): never => {
    throw new Error()
}

type SutTypes = {
    sut: DbListUsers
    listUsersRepositorySpy: ListUsersRepositorySpy
}

const makeSut = (): SutTypes => {
    const listUsersRepositorySpy = new ListUsersRepositorySpy()
    const sut = new DbListUsers(listUsersRepositorySpy)
    return {
        listUsersRepositorySpy,
        sut
    }
}

describe('DbListUsers Usecase', () => {
    test('Should throw if ListUsersRepository throws', async () => {
        const { sut, listUsersRepositorySpy } = makeSut()
        jest.spyOn(listUsersRepositorySpy, 'list').mockImplementationOnce(throwError)
        const promise = sut.handle()
        await expect(promise).rejects.toThrow()
    })

    test('Should return a list of accounts if ListUsersRepository succeds', async () => {
        const { sut } = makeSut()
        const users = await sut.handle()
        expect(users.length).toBe(1)
        expect(users[0]).toHaveProperty('identification')
        expect(users[0]).toHaveProperty('email')
        expect(users[0]).toBeDefined()
    })
})
