export class UserNotFoundError extends Error {
  constructor() {
    super('This user identification was not found')
    this.name = 'UserNotFoundError'
  }
}
