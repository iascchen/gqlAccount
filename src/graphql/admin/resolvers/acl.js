import {AuthenticationError} from 'apollo-server-express'

export default {
    Query: {
        acl: async (parent, { token }, { models: { aclModel }, me }, info) => {
            if (!me) {
                throw new AuthenticationError('You are not authenticated')
            }
            const entity = await aclModel.findOne({ token }).exec()
            return entity
        },
        aclList: async (parent, {}, { models: { aclModel }, me }, info) => {
            if (!me) {
                throw new AuthenticationError('You are not authenticated')
            }
            const entities = await aclModel.find({}).populate().exec()
            return entities
        },
    },
    Mutation: {
        createACL: async (parent, { acl }, { models: { aclModel }, me }, info) => {
            if (!me) {
                throw new AuthenticationError('You are not authenticated')
            }
            const newEntity = await new aclModel.create(acl)
            return newEntity
        },
        deleteACL: async (parent, { aclHash }, { models: { aclModel }, me }, info) => {
            if (!me) {
                throw new AuthenticationError('You are not authenticated')
            }
            return new Promise((resolve, reject) => {
                aclModel.findOne({ aclHash }).exec((err, res) => {
                    err ? reject(err) : resolve(res)
                })
            })
        }
    }
}
