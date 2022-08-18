const { auth } = require('../../middlwear/auth');
const displayProfile = require('./controller/profile');
const endPoint = require('./user.endPoint');

const router = require('express').Router();


router.get("/user/profile",auth(endPoint.profile),displayProfile)







module.exports = router