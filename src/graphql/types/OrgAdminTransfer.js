import {gql} from 'apollo-server-express'

export default gql`
    type OrgAdminTransfer {
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
        orgAdminTransfer(token: String!): OrgAdminTransfer!
    }

    extend type Mutation {
        createOrgAdminTransfer(transfer: CreateOrgAdminTransferInput): OrgAdminTransfer!
        deleteOrgAdminTransfer(_id: String!): OrgAdminTransfer!
    }

    input CreateOrgAdminTransferInput {
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
