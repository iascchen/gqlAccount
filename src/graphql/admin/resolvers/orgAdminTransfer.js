import {AuthenticationError} from "apollo-server-express";

export default {
    Query: {
        orgAdminTransfer: async (parent, { token }, { models: { orgAdminTransferModel }, me }, info) => {
            if (!me) {
                throw new AuthenticationError('You are not authenticated')
            }
            const entity = await orgAdminTransferModel.findOne({ token }).exec()
            return entity
        },
    },
    Mutation: {
        createOrgAdminTransfer: async (parent, { orgAdminTransfer }, { models: { orgAdminTransferModel }, me }, info) => {
            if (!me) {
                throw new AuthenticationError('You are not authenticated')
            }
            const newEntity = await new orgAdminTransferModel.create(orgAdminTransfer)
            return newEntity
        },
        deleteOrgAdminTransfer: async (parent, { _id }, { models: { orgAdminTransferModel }, me }, info) => {
            if (!me) {
                throw new AuthenticationError('You are not authenticated')
            }
            return new Promise((resolve, reject) => {
                orgAdminTransferModel.findByIdAndDelete(_id).exec((err, res) => {
                    err ? reject(err) : resolve(res)
                })
            })
        }
    }
}
