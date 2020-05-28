import {gql} from 'apollo-server-express'

export default gql`
    type Branch {
        _id: String!
        
        name: String!
        slug: String
        desc: String
        coverUri: String
        site: String
        
        parentId: String!
        users: [String]
        
        admin: String!
        adminTransferToken: String
        adminTransferExpires: Date
        
        organization: Organization
    
        status: Int
    }

    extend type Query {
        branch(_id: ID!): Branch!
        branches: [Branch!]!
    }

    extend type Mutation {
        createBranch(branch: CreateBranchInput): Branch!
        updateBranch(_id: String!, branch: UpdateBranchInput!): Branch!
        deleteBranch(_id: String!): Branch!
    }

    input CreateBranchInput {
        parentId: String!
        
        name: String!
        slug: String
        desc: String
        coverUri: String
        site: String

        admin: String!
    }
  
    input UpdateBranchInput {
        name: String
        slug: String
        desc: String
        coverUri: String
        site: String

        users: [String]

        admin: String
        adminTransferToken: String
        adminTransferExpires: Date
    
        status: Int
    }
`
