import { EmailValidator } from '@/validation/protocols'

export class EmailValidatorSpy implements EmailValidator {
  param: string
  isEmailValid: boolean = true
  isValid(email: string): boolean {
    this.param = email
    return this.isEmailValid
  }
}
