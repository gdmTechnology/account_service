import mongoose, { Schema } from 'mongoose'

const LogSchema = new Schema({
    stack: {
        type: String,
        required: true
    }
}, { timestamps: true })

export const LogModel = mongoose.model('LogModel', LogSchema)
