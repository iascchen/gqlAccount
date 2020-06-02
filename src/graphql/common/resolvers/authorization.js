import {AuthenticationError} from 'apollo-server-express'
import { skip } from 'graphql-resolvers'

export const isAuthenticated = (parent, args, { me }) =>
    me ? skip : new AuthenticationError('You are not authenticated')

// export const isAdmin = combineResolvers(
//     isAuthenticated,
//     (parent, args, { me: { role } }) =>
//         role === 'ADMIN'
//             ? skip
//             : new ForbiddenError('Not authorized as admin.'),
// )
//
// export const isMessageOwner = async (
//     parent,
//     { id },
//     { models, me },
// ) => {
//     const message = await models.Message.findById(id, { raw: true })
//
//     if (message.userId !== me.id) {
//         throw new ForbiddenError('Not authenticated as owner.')
//     }
//
//     return skip
// }
