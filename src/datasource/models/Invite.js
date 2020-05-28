import mongoose from 'mongoose'

const InviteSchema = new mongoose.Schema({
    token: { type: String, unique: true, required: true },
    expires: Date,

    fromUserId: { type: String, required: true },
    organizationId: String,
    branchId: String,

    mobile: String,
    email: String,
    wechat: String,
    weibo: String,
    facebook: String,
    twitter: String,
    google: String,
    github: String,
}, { timestamps: true })

InviteSchema.index( { 'expires': 1 }, { expireAfterSeconds: 0 } )

export default mongoose.model('Invite', InviteSchema)
