import mongoose from 'mongoose'

const ACLGroupSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    aclHashes: [String]  // ACLs
})

ACLGroupSchema.index({ aclHashes: 1 })

export default mongoose.model('ACL-Group', ACLGroupSchema)
