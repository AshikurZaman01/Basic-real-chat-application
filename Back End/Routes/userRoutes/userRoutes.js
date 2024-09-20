const express = require('express');
const upload = require('../../MiddleWears/imageUploader/imageUploader');
const { createUser } = require('../../Controllers/userControllers/createUser');
const loginUser = require('../../Controllers/userControllers/loginUser');
const isLoggedOut = require('../../MiddleWears/Users/isLoggedOut');
const userLoggedOut = require('../../Controllers/userControllers/userLogedout');
const isLoggedIn = require('../../MiddleWears/Users/isLoggedIn');
const router = express.Router();

router.post('/createUser', upload.single('image'), createUser);

router.post('/login', isLoggedOut, loginUser);

router.get('/logout', isLoggedIn, userLoggedOut)

module.exports = router;
