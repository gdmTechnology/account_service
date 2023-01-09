import { faker } from '@faker-js/faker'
import { EmailValidation } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'
import { EmailValidatorSpy } from '@/tests/validation/mocks'

const email = faker.internet.email()

const throwError = (): never => {
  throw new Error()
}
interface SutTypes {
  emailValidatorSpy: EmailValidatorSpy
  sut: EmailValidation
}

const makeSut = (): SutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy()
  const sut = new EmailValidation('email', emailValidatorSpy)
  return {
    emailValidatorSpy,
    sut
  }
}

describe('EmailValidation Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const { sut, emailValidatorSpy } = makeSut()
    emailValidatorSpy.isEmailValid = false
    const error = sut.validate({ email })
    expect(error).toEqual(new InvalidParamError('email'))
  })

  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorSpy } = makeSut()
    sut.validate({ email })
    expect(emailValidatorSpy.param).toBe(email)
  })
  test('Should not return if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ email })
    expect(error).toBeFalsy()
  })

  test('Should throw if EmailValidator throws', () => {
    const { sut, emailValidatorSpy } = makeSut()
    jest.spyOn(emailValidatorSpy, 'isValid').mockImplementationOnce(throwError)
    expect(sut.validate).toThrow()
  })
})
