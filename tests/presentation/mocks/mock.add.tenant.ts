import { AddTenant } from '@/domain/usecases'

export class AddTenantSpy implements AddTenant {
    input: any
    async handle(input: AddTenant.Request): Promise<AddTenant.Result> {
        this.input = input
        return this.input
    }
}
