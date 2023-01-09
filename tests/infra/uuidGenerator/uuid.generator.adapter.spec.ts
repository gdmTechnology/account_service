// import { v4 as uuidv4 } from 'uuid'
import uuid from 'uuid'
import { UuidGeneratorAdapter } from '@/infra/identificationGenerator'

jest.mock('uuid', () => ({
    v4(): string {
        return 'valid_uuid'
    }
}))

const makeSut = (): UuidGeneratorAdapter => {
    return new UuidGeneratorAdapter()
}

describe('UuidGeneratorAdapter', () => {
    test('Should call uuidv4', () => {
        const sut = makeSut()
        const uuidSpy = jest.spyOn(uuid, 'v4')
        sut.create()
        expect(uuidSpy).toHaveBeenCalled()
    })

    test('Should return valid uuid', () => {
        const sut = makeSut()
        const validUuid = sut.create()
        expect(validUuid).toBe('valid_uuid')
    })
})
