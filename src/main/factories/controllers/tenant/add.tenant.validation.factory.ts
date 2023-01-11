import { EmailValidation, RequiredFieldValidation, ValidationComposite, CnpjValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { EmailValidatorAdapter } from '@/infra/validators'

export const makeAddTenantValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['companyName', 'companyEmail', 'companyCnpj']) {
        validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('companyEmail', new EmailValidatorAdapter()))
    validations.push(new CnpjValidation('cnpjCompany'))

    return new ValidationComposite(validations)
}
