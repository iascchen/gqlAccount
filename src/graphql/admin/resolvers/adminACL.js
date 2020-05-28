import { AuthenticationError } from 'apollo-server-express'

export default {
    Query: {
        adminACL: async (parent, { _id }, { models: { adminACLModel }, me }, info) => {
            if (!me) {
                throw new AuthenticationError('You are not authenticated')
            }
            const adminACL = await adminACLModel.findById({ _id }).exec()
            return adminACL
        },
        adminACLs: async (parent, {}, { models: { adminACLModel }, me }, info) => {
            if (!me) {
                throw new AuthenticationError('You are not authenticated')
            }
            const adminACLs = await adminACLModel.find({}).populate().exec()
            return adminACLs
        }
    },
    Mutation: {
        createAdminACL: async (parent, { adminACL }, { models: { adminACLModel } }, info) => {
            const newEntity = await new adminACLModel.create(adminACL)
            return newEntity
        },
        updateAdminACL: async (parent, { _id, adminACL }, { models: { adminACLModel } }, info) => {
            return new Promise((resolve, reject) => {
                adminACLModel.findByIdAndUpdate(_id, { $set: { ...adminACL } }, { new: true }).exec(
                    (err, res) => {
                        err ? reject(err) : resolve(res)
                    }
                )
            })
        },
        deleteAdminACL: async (parent, { _id }, { models: { adminACLModel } }, info) => {
            return new Promise((resolve, reject) => {
                adminACLModel.findByIdAndDelete(_id).exec((err, res) => {
                    err ? reject(err) : resolve(res)
                })
            })
        }
    },
    AdminACL: {
        aclList: async ({ aclHashes }, args, { models: { aclModel } }, info) => {
            const ret = await aclModel.find({ aclHash: aclHashes }).exec()
            return ret
        },
    }
}
