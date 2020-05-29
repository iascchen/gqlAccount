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

        profile: Profile
    }
    
    type Invite {
        _id: String!
        mobile: String!
        token: String!
    }

    extend type Query {
        loginByMobile ( 
            mobile: String!, 
            password: String! 
        ): Token!
        
        me: User!
    }

    extend type Mutation {
        createUser (
            user: CreateUserInput!
        ): User!
        
        updateUser (
            _id: String!
            user: UpdateUserInput!
        ): User!
        
        resetPassword (
            user: ResetPasswordInput!
        ): User!
        
        passwordResetToken ( 
            mobile: String! 
        ): User!
        
        inviteToken ( 
            mobile: String! 
        ): Invite!
    }

    input CreateUserInput {
        mobile: String!
        password: String!
        inviteToken: String
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
