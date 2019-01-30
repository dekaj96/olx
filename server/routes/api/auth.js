const express = require('express');
const router = express.Router();
const passport = require('passport');
const authsController = require('../../controllers/auths');

router.post('/login', passport.authenticate('local', { session: false }), authsController.auth_login);

router.post('/register', authsController.auth_register);

module.exports = router;