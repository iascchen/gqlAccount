import {gql} from 'apollo-server-express'

import User from './User'
import Organization from './Organization'
import Branch from './Branch'
import Invite from './Invite'
import OrgAdminTransfer from './OrgAdminTransfer'
import ACLs from './ACL'
import ACLGroup from './ACLGroup'
import UserACL from './UserACL'
import AdminACL from './AdminACL'

const basic = gql`
    scalar Date
    
    type Token {
        token: String!
    }

    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }
`

const typeDefs = [basic, User, Organization, Branch, Invite, OrgAdminTransfer, ACLs, ACLGroup, UserACL, AdminACL]

// NOTE: 2nd param is optional, and defaults to false
// Only use if you have defined the same type multiple times in
// different files and wish to attempt merging them together.
// export default mergeTypes(typeDefs, { all: true })
export default typeDefs
