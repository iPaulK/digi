const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/', register);

module.exports = router;

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}