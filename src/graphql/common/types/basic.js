import {gql} from 'apollo-server-express'

export default gql`
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
`
