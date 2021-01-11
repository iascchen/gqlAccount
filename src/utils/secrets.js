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
export const PASSWORD_RESET_TOKEN_LEN = process.env['PASSWORD_RESET_TOKEN_LEN'] || 4
export const INVITE_TOKEN_TTL = process.env['INVITE_TOKEN_TTL'] || 180

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

/////////////////////////////
// LDAP Setting Env
/////////////////////////////

export const LDAP_SERVER = process.env['LDAP_SERVER'] || 'ldap://localhost:389'
export const LDAP_BIND_DN = process.env['LDAP_BIND_DN'] || 'cn=admin'
export const LDAP_BIND_PASSWORD = process.env['LDAP_BIND_PASSWORD'] || 'password'
export const LDAP_USER_BASE = process.env['LDAP_USER_BASE'] || 'ou=people'
export const LDAP_USER_FILTER = process.env['LDAP_USER_FILTER'] || '(&(uid={{username}})(objectclass=person))'
export const LDAP_USER_USERNAME = process.env['LDAP_USER_UID'] || 'uid'
export const LDAP_USER_FULLNAME = process.env['LDAP_USER_FULLNAME'] || 'sn'
export const LDAP_USER_EMAIL = process.env['LDAP_USER_EMAIL'] || 'mail'
export const LDAP_USER_MOBILE = process.env['LDAP_USER_MOBILE'] || 'mobile'
export const TLS_OPTIONS = process.env['TLS_OPTIONS'] ? JSON.parse(process.env['TLS_OPTIONS']) : { }
