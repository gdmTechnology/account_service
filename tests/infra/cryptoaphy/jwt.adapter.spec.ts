import jwt from 'jsonwebtoken'
import { JwtAdapter } from '@/infra/cryptography'

jest.mock('jsonwebtoken', () => ({
    async sign(): Promise<string> {
        return 'any_token'
    },

    async verify(): Promise<string> {
        return 'any_value'
    }
}))

const secret = 'any_secret'
const makeSut = (): JwtAdapter => { return new JwtAdapter(secret) }

const throwError = (): never => {
    throw new Error()
}

describe('Jwt Adapter', () => {
    describe('sign()', () => {
        test('Should call sign with correct values', async () => {
            const sut = makeSut()
            const signSpySpy = jest.spyOn(jwt, 'sign')
            await sut.encrypt('any_id')
            expect(signSpySpy).toHaveBeenCalledWith({ id: 'any_id' }, 'any_secret')
        })

        test('Should return a token on sign success', async () => {
            const sut = makeSut()
            const response = await sut.encrypt('any_id')
            expect(response).toBe('any_token')
        })

        test('Should throw if sign throws', async () => {
            const sut = makeSut()
            jest.spyOn(jwt, 'sign').mockImplementationOnce(throwError)
            const promise = sut.encrypt('any_id')
            await expect(promise).rejects.toThrowError()
        })
    })
    describe('verify()', () => {
        test('Should call verify with correct values', async () => {
            const sut = makeSut()
            const signSpySpy = jest.spyOn(jwt, 'verify')
            await sut.decrypt('any_token')
            expect(signSpySpy).toHaveBeenCalledWith('any_token', 'any_secret')
        })

        test('Should return a id on verify success', async () => {
            const sut = makeSut()
            const response = await sut.decrypt('any_token')
            expect(response).toBe('any_value')
        })

        test('Should throw if verify throws', async () => {
            const sut = makeSut()
            jest.spyOn(jwt, 'verify').mockImplementationOnce(throwError)
            const promise = sut.decrypt('any_token')
            await expect(promise).rejects.toThrowError()
        })
    })
})
