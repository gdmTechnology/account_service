import { CnpjValidation } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'

const validCnpj = '46.089.055/0001-10'
const randomWrongCnpj = '46.089.005/0001-20'
const cnpjWithMoreThan14 = '46.089.005/00001-20'
const cnpjWithLessThan14 = '46.09.005//0001-20'

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
    const error = sut.validate({ companyCnpj: randomWrongCnpj })
    expect(error).toEqual(new InvalidParamError('companyCnpj'))
  })

  test('Should return a InvalidParamError when cnpj has more than 14 characteres', () => {
    const { sut } = makeSut()
    const error = sut.validate({ companyCnpj: cnpjWithMoreThan14 })
    expect(error).toEqual(new InvalidParamError('companyCnpj'))
  })

  test('Should return a InvalidParamError when cnpj has less than 14 characteres', () => {
    const { sut } = makeSut()
    const error = sut.validate({ companyCnpj: cnpjWithLessThan14 })
    expect(error).toEqual(new InvalidParamError('companyCnpj'))
  })

  test('Should not return if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ companyCnpj: validCnpj })
    expect(error).toBeFalsy()
  })
})
