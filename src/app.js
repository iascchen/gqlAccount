import 'core-js/stable'
import 'regenerator-runtime/runtime'
import express from 'express'
import {ApolloServer} from 'apollo-server-express'
import {buildFederatedSchema} from '@apollo/federation'
import {buildContext} from 'graphql-passport'
import path from 'path'
import session from 'express-session'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import passport from 'passport'
import mongoose from 'mongoose'
import mongo from 'connect-mongo'

import {DB_URI, HEADER_FOR_AUTH, SESSION_SECRET} from './utils/secrets'
import {models} from './datasource'
import adminTypeDefs from './graphql/admin/types'
import adminResolvers from './graphql/admin/resolvers'
import apiTypeDefs from './graphql/client/types'
import apiResolvers from './graphql/client/resolvers'
import authentication_setup from './auth/authentication'

// Connect to MongoDB
mongoose.Promise = global.Promise
const mongoUrl = DB_URI
mongoose.connect(mongoUrl,
    { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true }).then(
    () => {
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
        console.log('MongoDB connection ok. ')
    },
).catch(err => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err)
    // process.exit();
})

const MongoStore = mongo(session)

const app = express()

app.set('port', process.env.PORT || 3000)
app.use(express.static(path.join(__dirname, '../public')))
app.use(cors())

// app.use(expressJwt({ secret: SESSION_SECRET, credentialsRequired: false }))

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    store: new MongoStore({
        url: DB_URI,
        autoReconnect: true
    }),
    // use secure cookies for production meaning they will only be sent via https
    //cookie: { secure: true }
}))

app.use(passport.initialize())
app.use(passport.session())

authentication_setup()

const getJwtUser = async (req) => {
    const token = req.headers[HEADER_FOR_AUTH]
    if (token) {
        try {
            const payload = await jwt.verify(token, SESSION_SECRET)
            return payload.gqlAccount
        } catch (e) {
            // console.log(e)
            return null
        }
    }
}
// app.get('/auth/wechat', passport.authenticate('wechat', { scope: ['email'] }));
// app.get('/auth/wechat/callback', passport.authenticate('wechat', {
//     successRedirect: 'http://localhost:3000',
//     failureRedirect: 'http://localhost:3000',
// }))

const adminServer = new ApolloServer({
    typeDefs: adminTypeDefs,
    resolvers: adminResolvers,
    // schema: applyMiddleware(
    //     buildFederatedSchema([{ typeDefs: apiTypeDefs, resolvers: apiResolvers }]),
    //     permissions
    // ),
    context: ({ req, res }) => {
        const user = req.user || null
        return buildContext({ req, res, models, user })
    }
})
adminServer.applyMiddleware({ app, path: '/admin' })

const accountServer = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs: apiTypeDefs, resolvers: apiResolvers }]),
    context: async ({ req, res }) => {
        const user = req.user || await getJwtUser(req)
        return buildContext({ req, res, models, user })
    }
})
accountServer.applyMiddleware({ app, cors: false, path: '/login' })

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
    console.log('  🚀 Account Admin Server is running at http://localhost:%d%s in %s mode', app.get('port'), adminServer.graphqlPath,
        app.get('env'))
    console.log('  🚀 Account Login API Server is running at http://localhost:%d%s in %s mode', app.get('port'), accountServer.graphqlPath,
        app.get('env'))
    console.log('  Press CTRL-C to stop\n')
})
