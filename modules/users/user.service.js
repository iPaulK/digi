const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../core/helpers/db');
const User = db.User;

module.exports = {
    authenticate,
    create
};

async function authenticate({ email, password }) {
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
        var payload = {
            sub: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
        };
        const accessToken = jwt.sign(payload, 'secretkey');
        return {
            accessToken
        };
    }
}

async function create(userParam) {
    //console.log("userParam", userParam)
    const user = new User(userParam);
    // save user
    await user.save();
}