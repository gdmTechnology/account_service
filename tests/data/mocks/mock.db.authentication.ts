import { AuthenticationRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository } from '@/data/protocols/db'
import { Encrypter, HashComparer } from '@/data/protocols/cryptography'

export class AuthenticationRepositorySpy implements AuthenticationRepository {
    params: any
    result: any = true
    async authentication(params: AuthenticationRepository.Params): Promise<AuthenticationRepository.Result> {
        this.params = params
        return this.result
    }
}

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
    params: any
    result: any = {
        email: 'email',
        password: 'password',
        identification: 'identification',
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
    }

    async loadAccountByEmail(params: any): Promise<LoadAccountByEmailRepository.Result> {
        this.params = params
        return this.result
    }
}

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
    params: any
    result: any = true

    async updateAccessToken(params: any): Promise<UpdateAccessTokenRepository.Result> {
        this.params = params
        return this.result
    }
}

export class HashComparerSpy implements HashComparer {
    hash: any
    result: any = true
    async compare(hash: string): Promise<boolean> {
        this.hash = hash
        return this.result
    }
}

export class EncryptSpy implements Encrypter {
    param: string
    result: string = 'any_digest'
    async encrypt(id: string): Promise<string> {
        this.param = id
        return this.result
    }
}
