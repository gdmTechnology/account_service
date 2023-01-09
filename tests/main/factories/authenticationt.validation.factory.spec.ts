import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { makeAuthenticationValidation } from '@/main/factories'
import { EmailValidatorAdapter } from '@/infra/validators'

jest.mock('@/validation/validators/validation.composite')

describe('AuthenticationValidation Factory', () => {
    test('Should call ValidationComposite with all validations', () => {
        makeAuthenticationValidation()
        const validations: Validation[] = []
        for (const field of ['email', 'password']) {
            validations.push(new RequiredFieldValidation(field))
        }
        validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
        expect(ValidationComposite).toHaveBeenCalledWith(validations)
    })
})
