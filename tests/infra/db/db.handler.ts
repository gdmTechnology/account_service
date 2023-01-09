import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

const mongod = new MongoMemoryServer()

export const MongoTestDbHelper = {
    client: null,
    uri: null as string,

    async connect(): Promise<void> {
        const mongod = await MongoMemoryServer.create()
        this.uri = mongod.getUri()
        this.client = await mongoose.connect(this.uri)
    },

    async disconnect(): Promise<void> {
        await mongoose.connection.dropDatabase()
        await mongoose.disconnect()
        await mongod.stop()
        this.client = null
    },

    async clearDatabase(): Promise<void> {
        const collections = mongoose.connection.collections

        for (const key in collections) {
            const collection = collections[key]
            await collection.deleteMany({})
        }
    }
}
