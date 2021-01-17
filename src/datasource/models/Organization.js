import mongoose from 'mongoose'

import {ORG_STATUS_NORMAL} from './constants'
import ContactSchema from '../common/Contact'

const OrganizationSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    slug: { type: String, unique: true },
    desc: String,
    coverUri: String,
    site: String,

    profile: {
        country: String,
        state: String,   // State or Province
        city: String,   // City
        address: String,   // diction and street

        contact: ContactSchema,

        billAccount: String,    // 银行账号
        license: String,        // 三证合一，编号
        licenseImage: String,   // 三证合一，照片

        corporate: String,      // 法人姓名
        corporateIdentity: String, // 法人身份证/护照
        corporatePhotoFront: String, // 身份证图片正面
        corporatePhotoBack: String, // 身份证图片背面
    },

    branches: [String], // 下级分支机构
    users: [String], // 机构成员ID

    admin: { type: String, required: true },  // 机构超级管理员
    adminTransferToken: String,
    adminTransferExpires: Date,

    certificated: { type: Boolean, default: false },
    status: { type: Number, required: true, default: ORG_STATUS_NORMAL }
}, { timestamps: true })

OrganizationSchema.index({ name: 1 })
OrganizationSchema.index({ slug: 1 })
OrganizationSchema.index({ certificated: 1 })
OrganizationSchema.index({ status: 1 })

export default mongoose.model('Organization', OrganizationSchema)
