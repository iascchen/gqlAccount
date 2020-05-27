import express from 'express'
import {ApolloServer, AuthenticationError} from 'apollo-server-express'
import path from 'path'
import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import cors from 'cors'
import mongoose from 'mongoose'

import {DB_URI, SESSION_SECRET} from './utils/secrets'
import {models} from './datasource'
import typeDefs from './graphql/types'
import resolvers from './graphql/resolvers'

// Connect to MongoDB
mongoose.Promise = global.Promise
const mongoUrl = DB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(
    () => {
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
        console.log('MongoDB connection ok. ')
    },
).catch(err => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err)
    // process.exit();
})

const app = express()

app.set('port', process.env.PORT || 3000)
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))
app.use(cors())

app.use(passport.initialize())
app.use(passport.session())

// app.use('*', jwtCheck, requireAuth, checkScope);

const getUser = async (req) => {
    const token = req.headers['token']

    if (token) {
        try {
            return await jwt.verify(token, SESSION_SECRET)
        } catch (e) {
            throw new AuthenticationError('Your session expired. Sign in again.')
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        if (req) {
            const me = await getUser(req)
            return {
                me,
                models,
            }
        }
    },
})
server.applyMiddleware({ app, path: '/api' })

app.listen(app.get('port'), () => {
    console.log('  🚀 Server is running at http://localhost:%d%s in %s mode', app.get('port'), server.graphqlPath,
        app.get('env'))
    console.log('  Press CTRL-C to stop\n')
})
