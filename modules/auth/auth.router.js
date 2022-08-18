const validation = require('../../middlwear/validation');
const { signupValidator, signinValidator } = require('./auth.validation');
const signin = require('./controller/signin');
const signup = require('./controller/signup');

const router = require('express').Router();







router.post('/signup' , validation(signupValidator),signup )
router.post('/signin',validation(signinValidator),signin)


module.exports = router