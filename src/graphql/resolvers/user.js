import bcrypt from 'bcrypt-nodejs'
import jwt from 'jsonwebtoken'
import {AuthenticationError} from 'apollo-server-express'
import {SESSION_SECRET} from '../../utils/secrets'

export default {
    Query: {
        user: async (parent, { _id }, { models: { userModel }, me }, info) => {
            if (!me) {
                throw new AuthenticationError('You are not authenticated')
            }
            const user = await userModel.findById({ _id }).exec()
            return user
        },
        login: async (parent, { mobile, password }, { models: { userModel } }, info) => {
            const user = await userModel.findOne({ mobile }).exec()

            if (!user) {
                throw new AuthenticationError('Invalid credentials')
            }

            const matchPasswords = bcrypt.compareSync(password, user.password)

            if (!matchPasswords) {
                throw new AuthenticationError('Invalid credentials')
            }

            const token = jwt.sign({ id: user.id }, SESSION_SECRET, { expiresIn: 24 * 10 * 50 })

            return {
                token,
            }
        },
        users: async (parent, {}, { models: { userModel }, me }, info) => {
            // users: async (parent, args, context, info) => {

            if (!me) {
                throw new AuthenticationError('You are not authenticated')
            }
            const users = await userModel.find({}).populate().exec()

            return users.map(u => ({
                _id: u._id.toString(),
                mobile: u.mobile,
                profile: u.profile,
            }))
        }
    },
    Mutation: {
        createUser: async (parent, { user }, { models: { userModel } }, info) => {
            const newUser = await new userModel.create({
                mobile: user.mobile,
                email: user.email,
            })

            return new Promise((resolve, reject) => {
                newUser.save((err, res) => {
                    err ? reject(err) : resolve(res)
                })
            })
        },
        updateUser: async (parent, { _id, user }, { models: { userModel } }, info) => {
            return new Promise((resolve, reject) => {
                userModel.findByIdAndUpdate(_id, { $set: { ...user } }, { new: true }).exec(
                    (err, res) => {
                        err ? reject(err) : resolve(res)
                    }
                )
            })
        },
        deleteUser: async (parent, { _id }, { models: { userModel } }, info) => {
            return new Promise((resolve, reject) => {
                userModel.findByIdAndDelete(_id).exec((err, res) => {
                    err ? reject(err) : resolve(res)
                })
            })
        }
    },
    User: {
        organizations: async ({ _id }, args, { models: { organizationModel } }, info) => {
            const ret = await organizationModel.find({ users: _id }).exec()
            return ret
        },
        branches: async ({ _id }, args, { models: { branchModel } }, info) => {
            const ret = await branchModel.find({ branches: _id }).exec()
            return ret
        },
    }
}
