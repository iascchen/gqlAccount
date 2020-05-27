import {gql} from 'apollo-server-express'

export default gql`
    type Invite {
        _id: String!
        
        token: String!
        expires: Date!

        mobile: String,
        email: String,
        wechat: String,
        weibo: String,
        facebook: String,
        twitter: String,
        google: String,
        github: String,
    }

    extend type Query {
        invite(token: String!): Invite!
    }

    extend type Mutation {
        createInvite(invite: CreateInviteInput): Invite!
        deleteInvite(_id: String!): Invite!
    }

    input CreateInviteInput {
        token: String!
        expires: Date!

        mobile: String,
        email: String,
        wechat: String,
        weibo: String,
        facebook: String,
        twitter: String,
        google: String,
        github: String,
    }
`;
