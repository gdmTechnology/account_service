import { Controller } from '@/presentation/protocols/controller'
import { badRequest } from '../helpers'
import { Validation } from '../protocols/validation'

export class CreateTenantController implements Controller {
    constructor(
        private readonly validation: Validation
    ) { }

    async handle(data: CreateTenantController.Request): Promise<any> {
        const validationError = this.validation.validate(data)
        if (validationError) return badRequest(validationError)
    }
}

export namespace CreateTenantController {
    export interface Request {
        tenantId: string
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
