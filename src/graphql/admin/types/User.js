import {gql} from 'apollo-server-express'

export default gql`
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
        
        organizations: [Organization!]!
        branches: [Branch!]!
        adminAcls: [AdminACL!]!
    }

    extend type Query {
        user(_id: ID!): User!
        users: [User!]!
                
        login ( mobile: String!, password: String! ): Token!
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
        deleteUser(
            _id: String!
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
