import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { makeUpdateAccountValidation } from '@/main/factories'

jest.mock('@/validation/validators/validation.composite')

describe('UpdateAccountValidation Factory', () => {
    test('Should call ValidationComposite with all validations', () => {
        makeUpdateAccountValidation()
        const validations: Validation[] = []
        for (const field of ['identification']) {
            validations.push(new RequiredFieldValidation(field))
        }
        expect(ValidationComposite).toHaveBeenCalledWith(validations)
    })
})
