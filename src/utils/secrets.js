import logger from './logger'
import dotenv from 'dotenv'
import fs from 'fs'

if (fs.existsSync('.env')) {
    logger.debug('Using .env file to supply passport environment variables')
    dotenv.config({ path: '.env' })
} else {
    logger.debug('Using .env.example file to supply passport environment variables')
    dotenv.config({ path: '.env.example' })  // you can delete this after you create your own .env file!
}
export const ENVIRONMENT = process.env.NODE_ENV
const prod = ENVIRONMENT === 'production' // Anything else is treated as 'dev'

export const SESSION_SECRET = process.env['SESSION_SECRET'] || 'zdn_jwt_secret_XXX'
export const DB_URI = prod ? process.env['DB_URI'] : process.env['DB_URI_LOCAL']
export const HEADER_FOR_AUTH = process.env['HEADER_FOR_AUTH'] || 'token'

if (!SESSION_SECRET) {
    logger.error('No client secret. Set SESSION_SECRET environment variable.')
    process.exit(1)
}

if (!DB_URI) {
    if (prod) {
        logger.error('No DB connection string. Set DB_URI environment variable.')
    } else {
        logger.error('No DB connection string. Set DB_URI_LOCAL environment variable.')
    }
    process.exit(1)
}
