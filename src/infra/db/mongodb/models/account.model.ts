import mongoose, { Schema } from 'mongoose'

const AccountSchema = new Schema({
    identification: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastName: String,
    birthDate: Date,
    tellphone: String,
    cellphone: String,
    streetAddress: String,
    numberAddress: String,
    districtAddress: String,
    cityAddress: String,
    stateAddress: String,
    accessToken: String,
    role: String,
    isLogged: {
        type: Boolean,
        default: true
    }
})

export const AccountModel = mongoose.model('AccountModel', AccountSchema)
