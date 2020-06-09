import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import {ORG_STATUS_NORMAL} from './constants'

const UserSchema = new mongoose.Schema({
    mobile: { type: String, unique: true, required: true },

    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,

    email: String,
    wechat: String,
    weibo: String,
    facebook: String,
    twitter: String,
    google: String,
    github: String,

    profile: {
        name: String,
        gender: String,
        location: String,
        website: String,
        picture: String
    },
    status: { type: Number, required: true, default: ORG_STATUS_NORMAL }
}, { timestamps: true })

/**
 * Password hash middleware.
 */
UserSchema.pre('save', function save(next) {
    const user = this
    if (!user.isModified('password')) { return next() }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err) }
        bcrypt.hash(user.password, salt, undefined, (err, hash) => {
            if (err) { return next(err) }
            user.password = hash
            next()
        })
    })
})

const comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        cb(err, isMatch)
    })
}

UserSchema.methods.comparePassword = comparePassword

UserSchema.index({ email: 1 })
UserSchema.index({ wechat: 1 })
UserSchema.index({ weibo: 1 })
UserSchema.index({ facebook: 1 })
UserSchema.index({ twitter: 1 })
UserSchema.index({ google: 1 })
UserSchema.index({ github: 1 })
UserSchema.index({ status: 1 })

export default mongoose.model('User', UserSchema)
