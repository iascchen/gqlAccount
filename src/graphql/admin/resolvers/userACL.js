import { AuthenticationError } from 'apollo-server-express'

export default {
    Query: {
        userACL: async (parent, { _id }, { models: { userACLModel }, me }, info) => {
            if (!me) {
                throw new AuthenticationError('You are not authenticated')
            }
            const userACL = await userACLModel.findById({ _id }).exec()
            return userACL
        },
        userACLs: async (parent, {}, { models: { userACLModel }, me }, info) => {
            if (!me) {
                throw new AuthenticationError('You are not authenticated')
            }
            const userACLs = await userACLModel.find({}).populate().exec()
            return userACLs
        }
    },
    Mutation: {
        createUserACL: async (parent, { userACL }, { models: { userACLModel } }, info) => {
            const newEntity = await new userACLModel.create(userACL)
            return newEntity
        },
        updateUserACL: async (parent, { _id, userACL }, { models: { userACLModel } }, info) => {
            return new Promise((resolve, reject) => {
                userACLModel.findByIdAndUpdate(_id, { $set: { ...userACL } }, { new: true }).exec(
                    (err, res) => {
                        err ? reject(err) : resolve(res)
                    }
                )
            })
        },
        deleteUserACL: async (parent, { _id }, { models: { userACLModel } }, info) => {
            return new Promise((resolve, reject) => {
                userACLModel.findByIdAndDelete(_id).exec((err, res) => {
                    err ? reject(err) : resolve(res)
                })
            })
        }
    },
    UserACL: {
        aclList: async ({ aclHashes }, args, { models: { aclModel } }, info) => {
            const ret = await aclModel.find({ aclHash: aclHashes }).exec()
            return ret
        },
    }
}
