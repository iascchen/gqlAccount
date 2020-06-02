import jwt from 'jsonwebtoken'
import {AuthenticationError, ForbiddenError} from 'apollo-server-express'
import {INVITE_TOKEN_TTL, PASSWORD_RESET_TOKEN_LEN, SESSION_SECRET} from '../../../utils/secrets'
import {addSeconds, genDigitToken} from '../../../utils/tools'

export default {
    Query: {
        me: (parent, args, context) => {
            return context.getUser()
        },
    },
    Mutation: {
        loginByMobile: async (parent, { mobile, password }, context) => {
            // console.log('in login', mobile, password)
            const { user } = await context.authenticate('graphql-local', { username: mobile, password })
            console.log('in login authenticated', user)
            if (!user) {
                throw new AuthenticationError('Invalid credentials')
            }

            context.login(user)

            const _user = { _id: user._id, mobile: user.mobile, email: user.email }
            delete _user.passwordResetExpires
            delete _user.passwordResetToken
            delete _user.password

            const token = jwt.sign({ 'gqlAccount': _user }, SESSION_SECRET,
                { expiresIn: 3600 * 10 })    // s
            return { token, user: _user }
        },

        logout: async (parent, args, context) => context.logout(),

        // Sign Up
        inviteToken: async (parent, { mobile }, { models: { inviteModel } }) => {
            // console.log('inviteToken', mobile)
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
            await newInvite.save()
            return newInvite
        },
        signUp: async (parent, { user }, context) => {
            console.log('signUp', user)
            const { userModel, inviteModel } = context.models

            const existUser = await userModel.findOne({ mobile: user.mobile })
            if (existUser) {
                throw new ForbiddenError('User already exists!')
            }

            // According Invite table use TTL index, we need not check expires datetime.
            const existInvite = await inviteModel.findOne({ mobile: user.mobile, token: user.inviteToken })
            if (!existInvite) {
                throw new ForbiddenError('Please apply token firstly!')
            }

            const newUser = await new userModel(user)
            return await newUser.save()
        },

        // Forgot password
        passwordResetToken: async (parent, { mobile }, { models: { userModel } }) => {
            // console.log('passwordResetToken', mobile)
            const _me = await userModel.findOne({ mobile: mobile })
            if (!_me) {
                throw new ForbiddenError('Without this mobile number!')
            }

            _me.passwordResetToken = genDigitToken(PASSWORD_RESET_TOKEN_LEN)
            _me.passwordResetExpires = addSeconds(new Date(), INVITE_TOKEN_TTL)
            return await _me.save()
        },
        resetPassword: async (parent, { user }, { models: { userModel } }) => {
            // console.log('resetPassword', user)
            const _me = await userModel.findOne({ mobile: user.mobile })
            if (!_me) {
                throw new ForbiddenError('Without this mobile number!')
            }

            const now = new Date().getTime()
            if ((user.passwordResetToken !== _me.passwordResetToken)
                || (now > _me.passwordResetExpires.getTime())) {
                throw new ForbiddenError('Please apply token!')
            }

            _me.password = user.password
            return await _me.save()
        },

        updateUser: async (parent, { _id, user }, { models: { userModel } }) => {
            return await userModel.findByIdAndUpdate(_id, { $set: { ...user } }, { new: true })
        },
    },
    User: {
        userACLs: async ({ _id }, args, { models: { userACLModel } }) => {
            const ret = await userACLModel.find({ users: _id })
            return ret
        },
    }
}
