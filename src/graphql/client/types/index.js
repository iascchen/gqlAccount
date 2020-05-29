import {gql} from 'apollo-server-express'

const typeDefs = gql`
    scalar Date
    
    type Token {
        token: String!
        user: String
    }

    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
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
        password: String
        passwordResetToken: String
        passwordResetExpires: Date
    
        email: String
        wechat: String
        weibo: String
        facebook: String
        twitter: String
        google: String
        github: String

        profile: Profile
    }

    extend type Query {
        loginByMobile( mobile: String!, password: String! ): Token!
        me: User!
    }

    extend type Mutation {
        createUser(
            user: CreateUserInput!
        ): User!
        updateUser(
            _id: String!
            user: UpdateUserInput!
        ): User!
    }

    input CreateUserInput {
        mobile: String!
        password: String!
        email: String
    }
  
    input UpdateUserInput {
        email: String
        password: String
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
