import express from 'express'
import {ApolloServer} from 'apollo-server-express'
import path from 'path'
import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import cors from 'cors'
import {DB_URI} from './utils/secrets'
import typeDefs from './graphql/types'
import mongoose from 'mongoose'
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

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const server = new ApolloServer({ typeDefs, resolvers })
server.applyMiddleware({ app, path: '/api' })

app.listen(app.get('port'), () => {
    console.log('  🚀 Server is running at http://localhost:%d%s in %s mode', app.get('port'), server.graphqlPath, app.get('env'))
    console.log('  Press CTRL-C to stop\n')
})
