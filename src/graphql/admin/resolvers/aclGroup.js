import {AuthenticationError} from 'apollo-server-express'

export default {
    Query: {
        aclGroup: async (parent, { _id }, { models: { aclGroupModel }, me }, info) => {
            if (!me) {
                throw new AuthenticationError('You are not authenticated')
            }
            const entity = await aclGroupModel.findOne({ token }).exec()
            return entity
        },
        aclGroups: async (parent, {}, { models: { aclGroupModel }, me }, info) => {
            if (!me) {
                throw new AuthenticationError('You are not authenticated')
            }
            const entities = await aclGroupModel.find({}).populate().exec()
            return entities
        },
    },
    Mutation: {
        createACLGroup: async (parent, { aclGroup }, { models: { aclGroupModel }, me }, info) => {
            if (!me) {
                throw new AuthenticationError('You are not authenticated')
            }
            const newEntity = await new aclGroupModel.create(aclGroup)
            return newEntity
        },
        updateACLGroup: async (parent, { _id, aclGroup }, { models: { aclGroupModel }, me }, info) => {
            return new Promise((resolve, reject) => {
                if (!me) {
                    throw new AuthenticationError('You are not authenticated')
                }
                aclGroupModel.findByIdAndUpdate(_id, { $set: { ...aclGroup } }, { new: true }).exec(
                    (err, res) => {
                        err ? reject(err) : resolve(res)
                    }
                )
            })
        },
        deleteACLGroup: async (parent, { aclGroupHash }, { models: { aclGroupModel }, me }, info) => {
            if (!me) {
                throw new AuthenticationError('You are not authenticated')
            }
            return new Promise((resolve, reject) => {
                aclGroupModel.findOne({ aclGroupHash }).exec((err, res) => {
                    err ? reject(err) : resolve(res)
                })
            })
        }
    },
    ACLGroup: {
        aclList: async ({ aclHashes }, args, { models: { aclModel } }, info) => {
            const ret = await aclModel.find({ aclHash: aclHashes }).exec()
            return ret
        },
    }
}
