import {gql} from 'apollo-server-express'

export default gql`
    type OrgProfile {
        billAccount: String    
        license: String       
        licenseImage: String 
        corporate: String  
        corporateIdentity: String
        corporatePhotoFront: String 
        corporatePhotoBack: String
    }

    type Organization {
        _id: String!
        name: String!
        slug: String
        desc: String
        coverUri: String
        site: String
        
        profile: Profile
        
        branches: [Branch!]!
        users: [User!]!

        admin: String!
        adminTransferToken: String
        adminTransferExpires: Date
    
        certificated: Boolean
        status: Int
    }

    extend type Query {
        organization(_id: ID!): Organization!
        organizations: [Organization!]!
    }

    extend type Mutation {
        createOrganization(org: CreateOrganizationInput): Organization!
        updateOrganization(_id: String!, org: UpdateOrganizationInput!): Organization!
        deleteOrganization(_id: String!): Organization!
    }

    input CreateOrganizationInput {
        name: String!
        slug: String
        desc: String
        coverUri: String
        site: String

        admin: String!
    }
  
    input UpdateOrganizationInput {
        name: String
        slug: String
        desc: String
        coverUri: String
        site: String
        
        profile: OrgProfileInput
        
        branches: [String]
        users: [String]

        admin: String
        adminTransferToken: String
        adminTransferExpires: Date
    
        certificated: Boolean
        status: Int
    }
    
    input OrgProfileInput {
        billAccount: String    
        license: String       
        licenseImage: String 
        corporate: String  
        corporateIdentity: String
        corporatePhotoFront: String 
        corporatePhotoBack: String
    }
`
