import mongoose from 'mongoose'

const UserACLSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // User
    orgId: String,  // org
    branchId: String,   //branch
    aclHashes: [String]  // ACLs
}, { timestamps: true })

UserACLSchema.index({ userId: 1, aclHashes: 1 })

export default mongoose.model('User-ACL', UserACLSchema)
