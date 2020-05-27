import mongoose from 'mongoose'

import {ORG_STATUS_NORMAL} from './constants'

const BranchSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    slug: { type: String, unique: true },
    desc: String,
    coverUri: String,
    site: String,

    parentId: { type: String, required: true }, // Organization
    users: [String], // 机构成员ID

    admin: { type: String, required: true },  // 机构超级管理员
    adminTransferToken: String,
    adminTransferExpires: Date,

    status: { type: Number, required: true, default: ORG_STATUS_NORMAL }
}, { timestamps: true })

BranchSchema.index({ name: 1 })
BranchSchema.index({ slug: 1 })
BranchSchema.index({ status: 1 })

export default mongoose.model('Branch', BranchSchema)
