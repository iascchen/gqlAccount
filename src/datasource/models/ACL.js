import mongoose from 'mongoose'

const ACLSchema = new mongoose.Schema({
    aclHash: { type: String, unique: true, required: true },
    uri: { type: String, required: true },
    method: { type: String, required: true }
}, { _id: false })

export default mongoose.model('ACL', ACLSchema)
