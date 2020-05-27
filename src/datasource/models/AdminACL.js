import mongoose from 'mongoose'

// Admin for Account Server
const AdminACLSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // User
    aclHashes: [String]  // ACLs
}, { timestamps: true })

AdminACLSchema.index({ userId: 1, aclHashes: 1 })

export default mongoose.model('Admin-ACL', AdminACLSchema)
