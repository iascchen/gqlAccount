import {gql} from 'apollo-server-express'

export default gql`
    type UserACL {
        _id: String!
        userId: String!
        orgId: String
        branchId: String
        aclHashes: [String]
        
        aclList: [ACL]
    }

    extend type Query {
        userACL(userId: String!): UserACL!
        userACLs: [UserACL!]!
    }

    extend type Mutation {
        createUserACL(userACL: CreateUserACLInput): UserACL!
        updateUserACL(_id: String!, userACL: UpdateUserACLInput!): UserACL!
        deleteUserACL(_id: String!): UserACL!
    }

    input CreateUserACLInput {
        userId: String!
        orgId: String
        branchId: String
        aclHashes: [String]
    }
  
    input UpdateUserACLInput {
        orgId: String
        branchId: String
        aclHashes: [String]
    }
`;
