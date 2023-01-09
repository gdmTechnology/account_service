import { CreateUuid } from '@/data/protocols'
import { v4 as uuidv4 } from 'uuid'

export class UuidGeneratorAdapter implements CreateUuid {
    create(): string {
        return uuidv4()
    }
}
