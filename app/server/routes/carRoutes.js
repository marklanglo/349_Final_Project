const express = require('express');
const passport = require('passport')
const router = express.Router();
const carController = require('../controllers/carController');

/**
 *  App Routes
 */
router.get('/', carController.homepage);
router.get('/login', carController.loginPage);
router.post('/login', carController.loginPageOnSubmit);
router.get('/register', carController.registerPage);
router.post('/register', carController.registerPageOnSubmit);
router.get('/secret', carController.secretPage);
router.get('/logout', carController.logout);
router.get('/account', carController.accountPage);


module.exports = router;