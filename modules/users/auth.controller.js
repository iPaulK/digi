const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/login', login);

module.exports = router;

function login(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ 
            errors: [{
                code:'invalid_credentials',
                target:'common',
                message:'Username or password is incorrect',
                source:{}
            }] 
        })).catch(err => next(err));
}