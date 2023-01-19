import { LoadAccountById } from '@/domain/usecases'
import { LoadAccountByIdRepository } from '@/data/protocols/db'

export class DbLoadAccountById implements LoadAccountById {
    constructor(
        private readonly loadAccountByIdRepository: LoadAccountByIdRepository
    ) { }

    async handle(data: LoadAccountById.Request): Promise<LoadAccountById.Result | null> {
        const exists = await this.loadAccountByIdRepository.loadAccountById(data.identification)
        return exists
    }
}
