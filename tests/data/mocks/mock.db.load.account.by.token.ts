import { LoadAccountByTokenRepository } from '@/data/protocols/db'
import { Decrypter } from '@/data/protocols/cryptography'

export class LoadAccountByTokenRepositorySpy implements LoadAccountByTokenRepository {
    params: any
    result: any = {
        email: 'email',
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
    }

    async load(params: any): Promise<LoadAccountByTokenRepository.Result> {
        this.params = params
        return this.result
    }
}

export class DecrypterSpy implements Decrypter {
    param: string
    result: string = 'any_id'
    async decrypt(plaintext: string): Promise<string> {
        this.param = plaintext
        return this.result
    }
}
