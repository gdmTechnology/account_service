import { AddTenant } from '@/domain/usecases'
import { Controller } from '@/presentation/protocols/controller'
import { ok, badRequest, forbidden, serverError } from '@/presentation/helpers'
import { Validation } from '@/presentation/protocols'
import { EmailInUseError } from '@/presentation/errors'

export class CreateTenantController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly addTenant: AddTenant
    ) { }

    async handle(data: CreateTenantController.Request): Promise<any> {
        try {
            const validationError = this.validation.validate(data)
            if (validationError) return badRequest(validationError)
            const tenant = await this.addTenant.handle(data)
            if (!tenant) return forbidden(new EmailInUseError())
            return ok(tenant)
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace CreateTenantController {
    export interface Request {
        companyName: string
        companyEmail: string
        companyTellphone: string
        companyCellphone: string
        companyCnpj: string
        companyAddress: string
        companyState: string
        companyNumber: string
        companyDistrict: string
        companyCity: string
    }
}
