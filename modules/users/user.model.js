const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        validate: [
            { validator: validator.isEmail, msg: 'Invalid email'},
        ],
        required: [true, 'Email address is required.'],
    },
    password: {
        type: String,
        minlength: [6, 'The value of `{PATH}` is shorter than the minimum allowed length ({MINLENGTH}).'],
        maxlength: [45, 'The value of `{PATH}` is longer than the maximum allowed length ({MAXLENGTH}).'],
        required: [true, 'Password is required']
    },
    firstName: {
        type: String,
        minlength: 2,
        maxlength: 45,
        required: [true, 'Why no First Name?']
    },
    lastName: {
        type: String,
        minlength: 2,
        maxlength: 45,
        required: [true, 'Last Name is required']
    },
    phoneNumber: {
        type: String,
        unique: true,
        validate: [
            { validator: validator.isMobilePhone, msg: 'Invalid phone number' }
        ],
        required: [true, 'Phone number is required']
    }
},
{ 
    timestamps: { 
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

/**
 * Methods
*/
UserSchema.methods = {
    comparePassword: function(candidatePassword, cb) {
        bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
            if (err) return cb(err);
            cb(null, isMatch);
        });
    }
}

UserSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', UserSchema);