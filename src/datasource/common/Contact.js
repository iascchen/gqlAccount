import mongoose from 'mongoose'

const Schema = mongoose.Schema
const contactSchema = new Schema({
    name: { type: String, required: true },
    mobile: String,
    email: String,
    phone: String,

    country: String,
    state: String,   // State or Province
    city: String,   // City
    address: String,   // diction and street

    status: { type: Number, default: 1 },
}, { timestamps: false })

contactSchema.index({ 'name': 1 })
contactSchema.index({ 'mobile': 1 })
contactSchema.index({ 'email': 1 })
contactSchema.index({ 'phone': 1 })

module.exports = contactSchema
