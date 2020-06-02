import {gql} from 'apollo-server-express'

const typeDefs = gql`
    scalar Date
    
    type Token {
        token: String!
        user: String
    }
  
    type Profile {
        name: String
        gender: String
        location: String
        website: String
        picture: String
    }
    
    type AuthPayload {
        token: String!
        user: User
    }
  
    type User {
        _id: String!
        
        mobile: String!
        
        email: String
        wechat: String
        weibo: String
        facebook: String
        twitter: String
        google: String
        github: String
        
        passwordResetToken: String

        profile: Profile
        
        userACLs: [UserACL]
    }
    
    type UserACL {
        _id: String!
        userId: String!
        orgId: String
        branchId: String
        aclHashes: [String]
    }
    
    type Invite {
        _id: String!
        mobile: String!
        token: String!
    }

    extend type Query {         
        me: User
    }

    extend type Mutation {
        loginByMobile( mobile: String!, password: String! ): AuthPayload
        
        logout: Boolean
        
        inviteToken ( mobile: String! ): Invite!
        signUp( user: CreateUserInput! ): User!
  
        passwordResetToken ( mobile: String! ): User!
        resetPassword ( user: ResetPasswordInput! ): User!
        
        updateUser ( id: String!, user: UpdateUserInput! ): User!
    }

    input CreateUserInput {
        mobile: String!
        password: String!
        inviteToken: String!
        email: String
    }
  
    input ResetPasswordInput {
        mobile: String!
        password: String!
        passwordResetToken: String!
    }
    
    input UpdateUserInput {
        email: String
        profile: ProfileInput
    }
    
    input ProfileInput {
        name: String,
        gender: String,
        location: String,
        website: String,
        picture: String
    }
`

export default typeDefs
