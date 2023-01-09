import { AddAccountRepository, CheckAccountByEmailRepository, CheckAccountByIdRepository, UpdateAccessTokenRepository, UpdateAccountRepository, LoadAccountByTokenRepository, LoadAccountByEmailRepository } from '@/data/protocols'
import { AccountModel } from './models'

export class AccountMongoRepository implements AddAccountRepository, UpdateAccountRepository, CheckAccountByIdRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository {
    async save(data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
        const model = new AccountModel(data)
        const result = await model.save()
        return result.identification !== null
    }

    async checkAccountByEmail(email: string): Promise<CheckAccountByEmailRepository.Result> {
        const result = await AccountModel.findOne({ email }).lean()
        return !!result
    }

    async loadAccountByEmail(email: string): Promise<LoadAccountByEmailRepository.Result> {
        return await AccountModel.findOne({ email }).lean()
    }

    async update(data: UpdateAccountRepository.Params): Promise<UpdateAccountRepository.Result> {
        const { identification, email, password, ...update } = data
        const filter = { identification }
        const option = { new: true }
        return await AccountModel.findOneAndUpdate(filter, update, option)
    }

    async checkAccountById(identification: string): Promise<CheckAccountByIdRepository.Result> {
        const result = await AccountModel.findOne({ identification }).lean()
        return !!result
    }

    async updateAccessToken(data: UpdateAccessTokenRepository.Params): Promise<UpdateAccessTokenRepository.Result> {
        const { identification, accessToken } = data
        const filter = { identification }
        const update = { accessToken, isLogged: true }
        const option = { new: true }
        const result = await AccountModel.findOneAndUpdate(filter, update, option).lean()
        return !!result
    }

    async load(data: LoadAccountByTokenRepository.Params): Promise<LoadAccountByTokenRepository.Result | null> {
        const result = await AccountModel.findOne(data).lean()
        return result
    }
}
