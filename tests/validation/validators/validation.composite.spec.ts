import { faker } from '@faker-js/faker'
import { ValidationComposite } from '@/validation/validators'
import { MissingParamError } from '@/presentation/errors'
import { ValidationSpy } from '@/tests/presentation/mocks'

const fieldName = faker.random.word()

type sutTypes = {
  sut: ValidationComposite
  arrValidationsSpy: ValidationSpy[]
}
const makeSut = (): sutTypes => {
  const arrValidationsSpy = [
    new ValidationSpy(),
    new ValidationSpy()
  ]
  const sut = new ValidationComposite(arrValidationsSpy)
  return { sut, arrValidationsSpy }
}

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, arrValidationsSpy } = makeSut()
    arrValidationsSpy[0].error = new MissingParamError(fieldName)
    const error = sut.validate({ fieldName })
    expect(error).toEqual(arrValidationsSpy[0].error)
  })
  test('Should return the first error if more then one validation fails', () => {
    const { sut, arrValidationsSpy } = makeSut()
    arrValidationsSpy[0].error = new Error()
    arrValidationsSpy[1].error = new MissingParamError(fieldName)
    const error = sut.validate({ fieldName })
    expect(error).toEqual(arrValidationsSpy[0].error)
  })
  test('Should not return if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ fieldName })
    expect(error).toBeUndefined()
  })
})
