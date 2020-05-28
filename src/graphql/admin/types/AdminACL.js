import {gql} from 'apollo-server-express'

export default gql`
    type AdminACL {
        _id: String!
        userId: String!
        aclHashes: [String]
        
        aclList: [ACL]
    }

    extend type Query {
        adminACL(userId: String!): AdminACL!
        adminACLs: [AdminACL!]!
    }

    extend type Mutation {
        createAdminACL(adminACL: CreateAdminACLInput): AdminACL!
        updateAdminACL(_id: String!, adminACL: UpdateAdminACLInput!): AdminACL!
        deleteAdminACL(_id: String!): AdminACL!
    }

    input CreateAdminACLInput {
        userId: String!
        aclHashes: [String]
    }
  
    input UpdateAdminACLInput {
        aclHashes: [String]
    }
`;
