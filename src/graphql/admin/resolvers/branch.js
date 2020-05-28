import { AuthenticationError } from 'apollo-server-express'

export default {
    Query: {
        branch: async (parent, { _id }, { models: { branchModel }, me }, info) => {
            if (!me) {
                throw new AuthenticationError('You are not authenticated')
            }
            const entity = await branchModel.findById({ _id }).exec()
            return entity
        },
        branches: async (parent, {}, { models: { branchModel }, me }, info) => {
            if (!me) {
                throw new AuthenticationError('You are not authenticated')
            }
            const entities = await branchModel.find({}).populate().exec()
            return entities
        }
    },
    Mutation: {
        createBranch: async (parent, { branch }, { models: { branchModel } }, info) => {
            const newEntity = await new branchModel.create({
                mobile: branch.mobile,
                email: branch.email,
            })
            return newEntity
        },
        updateBranch: async (parent, { _id, branch }, { models: { branchModel } }, info) => {
            return new Promise((resolve, reject) => {
                branchModel.findByIdAndUpdate(_id, { $set: { ...branch } }, { new: true }).exec(
                    (err, res) => {
                        err ? reject(err) : resolve(res)
                    }
                )
            })
        },
        deleteBranch: async (parent, { _id }, { models: { branchModel } }, info) => {
            return new Promise((resolve, reject) => {
                branchModel.findByIdAndDelete(_id).exec((err, res) => {
                    err ? reject(err) : resolve(res)
                })
            })
        }
    },
    Branch: {
        users: async ({ users }, args, { models: { userModel } }, info) => {
            const ret = await userModel.find({ _id: users }).exec()
            return ret
        },
        organization: async ({ parentId }, args, { models: { organizationModel } }, info) => {
            const ret = await organizationModel.find({ _id: parentId }).exec()
            return ret
        },
    }
}
