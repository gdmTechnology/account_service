import { CheckTenantByEmailRepository } from '@/data/protocols/db'

export class CheckTenantByEmailRepositorySpy implements CheckTenantByEmailRepository {
    params: any
    result: any = false
    async check(email: string): Promise<CheckTenantByEmailRepository.Result> {
        this.params = email
        return this.result
    }
}
