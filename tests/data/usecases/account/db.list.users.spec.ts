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
})
