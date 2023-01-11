import mongoose, { Schema } from 'mongoose'

const TenantSchema = new Schema({
    tenantId: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    companyEmail: {
        type: String,
        unique: true,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    companyCnpj: {
        type: String,
        required: true
    },
    companyTellphone: String,
    companyCellphone: String,
    companyAddress: String,
    companyState: String,
    companyNumber: String,
    companyDistrict: String,
    companyCity: String,
    companyIsActived: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

export const TenantModel = mongoose.model('TenantModel', TenantSchema)
