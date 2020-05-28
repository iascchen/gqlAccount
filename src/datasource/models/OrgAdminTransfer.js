import mongoose from 'mongoose'

const OrgAdminTransferSchema = new mongoose.Schema({
    token: { type: String, unique: true, required: true },
    expires: Date,

    fromUserId: { type: String, required: true },
    toUserId: { type: String, required: true },

    organizationId: { type: String, required: true },
    branchId: String,
}, { timestamps: true })

OrgAdminTransferSchema.index( { 'expires': 1 }, { expireAfterSeconds: 0 } )

export default mongoose.model('Org-Admin-Transfer', OrgAdminTransferSchema)
