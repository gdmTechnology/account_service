export class NotFoundIdentificationError extends Error {
  constructor() {
    super('Not found this account identification!')
    this.name = 'NotFoundIdentificationError'
  }
}
