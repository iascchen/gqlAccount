import bcrypt from 'bcrypt-nodejs'
import jwt from 'jsonwebtoken'
import {AuthenticationError} from 'apollo-server-express'
import {INVITE_TOKEN_TTL, PASSWORD_RESET_TOKEN_LEN, SESSION_SECRET} from '../../../utils/secrets'
import {addSeconds, genDigitToken} from '../../../utils/tools'

export default {
    Query: {
        loginByMobile: async (parent, { mobile, password }, { models: { userModel } }, info) => {
            const user = await userModel.findOne({ mobile }).exec()

            if (!user) {
                throw new AuthenticationError('Invalid credentials')
            }

            const matchPasswords = bcrypt.compareSync(password, user.password)
            if (!matchPasswords) {
                throw new AuthenticationError('Invalid credentials')
            }
            console.log(user.toJSON())
            const token = jwt.sign({ id: user._id }, SESSION_SECRET, { expiresIn: 24 * 10 * 50 })
            return { token, user: JSON.stringify(user) }
        },
        me: async (parent, {}, { models: { userModel }, me }, info) => {
            if (!me) {
                throw new AuthenticationError('You are not authenticated')
            }
            const entity = await userModel.findById(me.id).exec()
            return entity
        },
    },
    Mutation: {
        createUser: async (parent, { user }, { models: { userModel, inviteModel } }, info) => {
            console.log('createUser', user)

            const exist = await inviteModel.findOne({ mobile: user.mobile, token: user.inviteToken })
            if (!exist) {
                throw new AuthenticationError('Invalid invite token')
            }

            const newUser = await new userModel(user)

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
        resetPassword: async (parent, { user }, { models: { userModel } }, info) => {
            console.log('resetPassword', user)

            const me = await userModel.findOne({ mobile: user.mobile })
            if (me.passwordResetToken === user.passwordResetToken) {
                me.password = user.password
            } else {
                throw new AuthenticationError('You are not authenticated')
            }
            return new Promise((resolve, reject) => {
                me.save((err, res) => {
                    err ? reject(err) : resolve(res)
                })
            })
        },
        passwordResetToken: async (parent, { mobile }, { models: { userModel } }, info) => {
            console.log('passwordResetToken', mobile)

            const me = await userModel.findOne({ mobile: mobile })
            if (!me) {
                throw new AuthenticationError('Without this mobile number')
            }

            me.passwordResetToken = genDigitToken(PASSWORD_RESET_TOKEN_LEN)
            me.passwordResetExpires = addSeconds(new Date(), INVITE_TOKEN_TTL)

            return new Promise((resolve, reject) => {
                me.save((err, res) => {
                    err ? reject(err) : resolve(res)
                })
            })
        },
        inviteToken: async (parent, { mobile }, { models: { inviteModel } }, info) => {
            console.log('inviteToken', mobile)
            const exist = await inviteModel.findOne({ mobile: mobile })
            if (exist) {
                return exist
            }

            // const newUser = await new inviteModel(user)
            const expires = addSeconds(new Date(), INVITE_TOKEN_TTL)
            const invite = {
                mobile, token: genDigitToken(PASSWORD_RESET_TOKEN_LEN), expires
            }
            const newInvite = await new inviteModel(invite)

            return new Promise((resolve, reject) => {
                newInvite.save((err, res) => {
                    err ? reject(err) : resolve(res)
                })
            })
        },
    }
}
