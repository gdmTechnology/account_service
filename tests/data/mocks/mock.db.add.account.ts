import { AddAccountRepository, CheckAccountByEmailRepository, LoadTenantRepository } from '@/data/protocols/db'
import { Hasher, CreateUuid } from '@/data/protocols/cryptography'

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
    params: any
    result: any = false
    async checkAccountByEmail(email: string): Promise<CheckAccountByEmailRepository.Result> {
        this.params = email
        return this.result
    }
}
export class AddAccountRepositorySpy implements AddAccountRepository {
    params: any
    result: any = true
    async save(params: any): Promise<AddAccountRepository.Result> {
        this.params = params
        return this.result
    }
}
export class HasherSpy implements Hasher {
    digest = 'any_digest'
    plaintext: string

    async hash(plaintext: string): Promise<string> {
        this.plaintext = plaintext
        return this.digest
    }
}

export class CreateUuidSpy implements CreateUuid {
    id = 'any_id'

    create(): string {
        return this.id
    }
}

export class LoadTenantRepositorySpy implements LoadTenantRepository {
    params: any
    result: any = {
        tenantId: 'any_id',
        companyAddress: 'companyAddress',
        companyCellphone: 'companyCellphone',
        companyCity: 'companyCity',
        companyCnpj: 'companyCnpj',
        companyDistrict: 'companyDistrict',
        companyEmail: 'companyEmail',
        companyName: 'companyName',
        companyNumber: 'companyNumber',
        companyState: 'companyState',
        companyTellphone: 'companyTellphone',
        companyIsActived: true,
        createdAt: 'createdAt',
        updateAt: 'updateAt'
    }

    async load(params: any): Promise<LoadTenantRepository.Result> {
        this.params = params
        return this.result
    }
}
