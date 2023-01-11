import { Validation } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'

export class CnpjValidation implements Validation {
  constructor(private readonly fieldName: string) { }

  validate(input: any): Error {
    if (!input[this.fieldName]) return new InvalidParamError(this.fieldName)

    // Aceita receber o valor como string, número ou array com todos os dígitos
    const isString = typeof input[this.fieldName] === 'string'
    const validTypes = isString || Number.isInteger(input[this.fieldName]) || Array.isArray(input[this.fieldName])

    // Elimina valor em formato inválido
    if (!validTypes) return new InvalidParamError(this.fieldName)

    // Filtro inicial para entradas do tipo string
    if (isString) {
      // Limita ao máximo de 18 caracteres, para CNPJ formatado
      if (input[this.fieldName].length > 18) return new InvalidParamError(this.fieldName)

      // Teste Regex para veificar se é uma string apenas dígitos válida
      const digitsOnly = /^\d{14}$/.test(input[this.fieldName])
      // Teste Regex para verificar se é uma string formatada válida
      const validFormat = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/.test(input[this.fieldName])
      if (digitsOnly || validFormat) true
    }

    // Guarda um array com todos os dígitos do valor
    const match = input[this.fieldName].toString().match(/\d/g)
    const numbers = Array.isArray(match) ? match.map(Number) : []

    // Valida a quantidade de dígitos
    if (numbers.length !== 14) return new InvalidParamError(this.fieldName)
    console.log('3: ')
    // Elimina inválidos com todos os dígitos iguais
    const items = [...new Set(numbers)]
    if (items.length === 1) return new InvalidParamError(this.fieldName)
    console.log('4: ')
    // Cálculo validador
    const calc = (x) => {
      const slice = numbers.slice(0, x)
      let factor = x - 7
      let sum = 0

      for (let i = x; i >= 1; i--) {
        const n = slice[x - i]
        sum += n * factor--
        if (factor < 2) factor = 9
      }

      const result = 11 - (sum % 11)

      return result > 9 ? 0 : result
    }

    // Separa os 2 últimos dígitos de verificadores
    const digits = numbers.slice(12)

    // Valida 1o. dígito verificador
    const digit0 = calc(12)
    if (digit0 !== digits[0]) return new InvalidParamError(this.fieldName)

    // Valida 2o. dígito verificador
    const digit1 = calc(13)
    if (digit1 !== digits[1]) return new InvalidParamError(this.fieldName)
  }
}
