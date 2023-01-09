import { MongoClient } from 'mongodb'
import mongoose from 'mongoose'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect(uri: string): Promise<void> {
    this.uri = uri
    this.client = await mongoose.connect(uri)
  },

  async disconnect(): Promise<void> {
    await mongoose.disconnect()
    this.client = null
  }
}
