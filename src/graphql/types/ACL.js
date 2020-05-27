import {gql} from 'apollo-server-express'

export default gql`
    type ACL {
        aclHash: String!
        uri: String!
        method: String!
    }

    extend type Query {
        acl(aclHash: String!): ACL!
        acls: [ACL!]!
    }

    extend type Mutation {
        createACL(acl: CreateACLInput): ACL!
        deleteACL(aclHash: String!): ACL!
    }

    input CreateACLInput {
        uri: String!
        method: String!
    }
`;
