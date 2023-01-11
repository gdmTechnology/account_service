import { CnpjValidation } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'

const validCnpj = '46.089.055/0001-10'
const invalidCnpj = '46.089.005/0001-20'

const throwError = (): never => {
  throw new Error()
}
interface SutTypes {
  sut: CnpjValidation
}

const makeSut = (): SutTypes => {
  const sut = new CnpjValidation('companyCnpj')
  return {
    sut
  }
}

describe('CnpjValidation Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const { sut } = makeSut()
    const error = sut.validate({ companyEmail: invalidCnpj })
    expect(error).toEqual(new InvalidParamError('companyCnpj'))
  })

  // test('Should call EmailValidator with correct email', () => {
  //   const { sut, emailValidatorSpy } = makeSut()
  //   sut.validate({ email })
  //   expect(emailValidatorSpy.param).toBe(email)
  // })
  // test('Should not return if validation succeeds', () => {
  //   const { sut } = makeSut()
  //   const error = sut.validate({ email })
  //   expect(error).toBeFalsy()
  // })

  // test('Should throw if EmailValidator throws', () => {
  //   const { sut, emailValidatorSpy } = makeSut()
  //   jest.spyOn(emailValidatorSpy, 'isValid').mockImplementationOnce(throwError)
  //   expect(sut.validate).toThrow()
  // })
})
