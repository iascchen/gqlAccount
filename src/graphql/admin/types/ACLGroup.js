import {gql} from 'apollo-server-express'

export default gql`
    type ACLGroup {
        _id: String!
        name: String!
        aclHash: [String]!
        
        aclList: [ACL]
    }

    extend type Query {
        aclGroup(_id: ID!): ACLGroup!
        aclGroups: [ACLGroup!]!
    }

    extend type Mutation {
        createACLGroup(aclGroup: CreateACLGroupInput): ACLGroup!
        updateACLGroup(_id: String!, aclGroup: UpdateACLGroupInput): ACLGroup!
        deleteACLGroup(_id: String!): ACLGroup!
    }

    input CreateACLGroupInput {
        name: String!
        aclHash: [String]!
    }
    
    input UpdateACLGroupInput {
        name: String!
        aclHash: [String]!
    }
`;
