import mongoose from 'mongoose'
import {INVITE_TOKEN_TTL} from '../../utils/secrets'

const InviteSchema = new mongoose.Schema({
    mobile: { type: String, unique: true, required: true },
    token: { type: String, required: true },
    expires: Date,

    fromUserId: String,
    organizationId: String,
    branchId: String,

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
