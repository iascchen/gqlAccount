import {gql} from 'apollo-server-express'

export default gql`
    type Profile {
        name: String,
        gender: String,
        location: String,
        website: String,
        picture: String
    }

    type User {
        _id: String!
        mobile: String!
        email: String
        profile: Profile
    }

    type Query {
        user(_id: ID!): User!
        users: [User!]!
    }

    type Mutation {
        createUser(user: CreateUserInput): User!
        updateUser(_id: String!, user: UpdateUserInput!): User!
        deleteUser(_id: String!): User!
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
`;
