import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

export const makeDeleteAccountValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['identification']) {
        validations.push(new RequiredFieldValidation(field))
    }
    return new ValidationComposite(validations)
}
