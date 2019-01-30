const passport = require('passport');
const User = require('../models/UserAccount');

module.exports = () => { passport.use(User.createStrategy() )};