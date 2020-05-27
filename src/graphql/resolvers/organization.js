import { AuthenticationError } from 'apollo-server-express'

export default {
    Query: {
        organization: async (parent, { _id }, { models: { organizationModel }, me }, info) => {
            if (!me) {
                throw new AuthenticationError('You are not authenticated')
            }
            const organization = await organizationModel.findById({ _id }).exec()
            return organization
        },
        organizations: async (parent, {}, { models: { organizationModel }, me }, info) => {
            // organizations: async (parent, args, context, info) => {

            if (!me) {
                throw new AuthenticationError('You are not authenticated')
            }
            const organizations = await organizationModel.find({}).populate().exec()
            return organizations
        }
    },
    Mutation: {
        createOrganization: async (parent, { organization }, { models: { organizationModel } }, info) => {
            const newOrganization = await new organizationModel.create({
                mobile: organization.mobile,
                email: organization.email,
            })
            return newOrganization
        },
        updateOrganization: async (parent, { _id, organization }, { models: { organizationModel } }, info) => {
            return new Promise((resolve, reject) => {
                organizationModel.findByIdAndUpdate(_id, { $set: { ...organization } }, { new: true }).exec(
                    (err, res) => {
                        err ? reject(err) : resolve(res)
                    }
                )
            })
        },
        deleteOrganization: async (parent, { _id }, { models: { organizationModel } }, info) => {
            return new Promise((resolve, reject) => {
                organizationModel.findByIdAndDelete(_id).exec((err, res) => {
                    err ? reject(err) : resolve(res)
                })
            })
        }
    },
    Organization: {
        users: async ({ users }, args, { models: { userModel } }, info) => {
            const ret = await userModel.find({ _id: users }).exec()
            return ret
        },
        branches: async ({ branches }, args, { models: { branchModel } }, info) => {
            const ret = await branchModel.find({ _id: branches }).exec()
            return ret
        },
    }
}
