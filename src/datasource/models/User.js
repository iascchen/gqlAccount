import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const UserSchema = new mongoose.Schema({
    mobile: { type: String, unique: true, required: true },
    email: String,
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,

    // facebook: String,
    // twitter: String,
    // google: String,
    // tokens: Array,

    profile: {
        name: String,
        gender: String,
        location: String,
        website: String,
        picture: String
    }
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

export default mongoose.model('User', UserSchema)
