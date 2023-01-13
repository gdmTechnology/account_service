export class NotFoundTenantError extends Error {
  constructor() {
    super('Not found tenant!')
    this.name = 'NotFoundTenantError'
  }
}
