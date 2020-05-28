export default {
    Query: {
        invite: async (parent, { token }, { models: { inviteModel } }, info) => {
            const entity = await inviteModel.findOne({ token }).exec()
            return entity
        },
    },
    Mutation: {
        createInvite: async (parent, { invite }, { models: { inviteModel }, me }, info) => {
            const newEntity = await new inviteModel.create(invite)
            return newEntity
        },
        deleteInvite: async (parent, { _id }, { models: { inviteModel } }, info) => {
            return new Promise((resolve, reject) => {
                inviteModel.findByIdAndDelete(_id).exec((err, res) => {
                    err ? reject(err) : resolve(res)
                })
            })
        }
    }
}
