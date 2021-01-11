import passport from 'passport'
// import * as fs from 'fs'
import LdapStrategy from 'passport-ldapauth'
import {GraphQLLocalStrategy} from 'graphql-passport'
import bcrypt from 'bcrypt'

import userModel from '../datasource/models/User'
import {
    LDAP_BIND_DN,
    LDAP_BIND_PASSWORD,
    LDAP_SERVER,
    LDAP_USER_BASE, LDAP_USER_EMAIL,
    LDAP_USER_FILTER,
    LDAP_USER_FULLNAME, LDAP_USER_MOBILE, LDAP_USER_USERNAME, TLS_OPTIONS
} from '../utils/secrets'

const getLDAPConfiguration = (req, callback) => {
    const {uid, password} = req.body.variables
    req.body.username = uid
    req.body.password = password

    // console.log('in getLDAPConfiguration', uid, password)
    // Fetching things from database or whatever
    process.nextTick(() => {
        const opts = {
            server: {
                url: LDAP_SERVER,
                bindDN: LDAP_BIND_DN,
                bindCredentials: LDAP_BIND_PASSWORD,
                searchBase: LDAP_USER_BASE,
                searchFilter: LDAP_USER_FILTER,
                searchAttributes: [
                    LDAP_USER_USERNAME, LDAP_USER_FULLNAME, LDAP_USER_EMAIL, LDAP_USER_MOBILE,
                    'uid', 'cn', 'sn', 'displayName', 'mail', 'mobile',
                    'picture', 'website', 'location', 'gender'  // TODO define LDAP attribute
                ],
                tlsOptions: TLS_OPTIONS
            }
        }
        // console.log('opt', opts)

        callback(null, opts)
    })
}

// Setting up passport
export const authentication_setup = () => {
    // Setup strategy (local in this case)
    passport.use(new GraphQLLocalStrategy(
        (username, password, done) => {
            process.nextTick(() => {
                find_by_mobile(username, (error, user) => {
                    if (error) {
                        return done(error)
                    }
                    if (!user) {
                        return done(null, false, { message: 'Unknown user ' + username })
                    }

                    const matchPasswords = bcrypt.compareSync(password, user.password)
                    if (!matchPasswords) {
                        return done(null, false, { message: 'Invalid password' })
                    }

                    // Authenticated
                    // console.log('Authenticated', user)
                    return done(null, user)
                })
            })
        }
    ))

    passport.use(new LdapStrategy(getLDAPConfiguration, (user, done) => {
        process.nextTick(() => {
            if (!user) {
                return done(null, false, { message: 'Unknown LDAP User ' + user })
            }

            // Authenticated
            // console.log('Authenticated', user)

            const profile = {
                name: user[LDAP_USER_FULLNAME] || user.displayName || user.sn || user.cn,
                email: user[LDAP_USER_EMAIL] || user.mail,
                mobile:user[LDAP_USER_MOBILE] || user.mobile,
                ...user
            }
            const { email, mobile} = profile
            const retUser = { _id: user[LDAP_USER_USERNAME] || user.uid, openId: user.dn, ldapDN: user.dn,
                email, mobile, profile }
            return done(null, retUser)
        })
    }))

    // const wechatCallback = (accessToken, refreshToken, profile, done) => {
    //     // const users = User.getUsers();
    //     const matchingUser = users.find(user => user.facebook === profile.id);
    //
    //     if (matchingUser) {
    //         done(null, matchingUser);
    //         return;
    //     }
    //
    //     const newUser = {
    //         id: uuid(),
    //         facebookId: profile.id,
    //         firstName: profile.name.givenName,
    //         lastName: profile.name.familyName,
    //         email: profile.emails && profile.emails[0] && profile.emails[0].value,
    //     };
    //     users.push(newUser);
    //     done(null, newUser);
    // };
    //
    // passport.use(new WechatStrategy(
    //     {
    //         clientID: FACEBOOK_APP_ID,
    //         clientSecret: FACEBOOK_APP_SECRET,
    //         callbackURL: 'http://localhost:4000/auth/facebook/callback',
    //         profileFields: ['id', 'email', 'first_name', 'last_name'],
    //     },
    //     facebookCallback,
    // ));

    // Setup session support
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser((id, done) => {
        find_user_by_id(id, (error, user) => {
            done(error, user)
        })
    })
}

// Helper used in setup by passport
const _returnResult = (result, callback) => {
    if(result._id){
        return callback(null, result)
    }

    const error = new Error('User does not exist.')
    error.status = 404
    return callback(error, null)
}

const find_user_by_id = (id, callback) => {
    userModel.findById(id).then(
        (result) => {
            return _returnResult(result, callback)
        },
        (err) => {
            return callback(err, null)
        }
    )
}

const find_by_mobile = (mobile, callback) => {
    userModel.findOne({ mobile }).then(
        (result) => {
            return _returnResult(result, callback)
        },
        (err) => {
            return callback(err, null)
        }
    )
}

export default authentication_setup
