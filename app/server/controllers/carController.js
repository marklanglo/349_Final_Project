require('../models/database');
const passport = require('passport');
const User = require('../routes/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

/**
 * GET /
 * Homepage
 */
exports.homepage = async(req, res) => {
res.render('index', {title: 'Toy Car Trade - Home' });
}


/**
 * GET /register
 * Register
 */
exports.registerPage = async(req, res) => {
    res.render('register', {title: 'Toy Car Trade - Register'});
}

/**
 * GET /login
 * Login
 */
 exports.loginPage = async(req, res) => {
    res.render('login', {title: 'Toy Car Trade - Login' });
}

/**
 * POST /register
 * Register Submit
 */
 exports.registerPageOnSubmit = async(req, res) => {
    const { firstName, lastName, email, userName, password: plainTextPassword, 
		passwordConfirmation:plainTextPasswordConfirmation, phoneNumber } = req.body

	if (!firstName || typeof firstName !== 'string') {
		return res.json({ status: 'error', error: 'Invalid First Name' })
	}

	if (!lastName || typeof lastName !== 'string') {
		return res.json({ status: 'error', error: 'Invalid Last Name' })
	}

	if (!email || typeof email !== 'string') {
		return res.json({ status: 'error', error: 'Invalid email' })
	}
	if (!userName || typeof userName !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}
	if (!phoneNumber || typeof phoneNumber !== 'string') {
		return res.json({ status: 'error', error: 'Invalid phone number' })
	}
	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword != plainTextPasswordConfirmation) {
		return res.json({ status: 'error', error: 'Password does not match' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	const password = await bcrypt.hash(plainTextPassword, 10)

	try {
		const response = await User.create({
			firstName,
			lastName,
			email,
			userName,
			phoneNumber,
			password,
			plainTextPasswordConfirmation
		})
        res.redirect('account')
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'email already in use' })
		}
		throw error
	}

}

/**
 * POST /login
 * Login
 */
 exports.loginPageOnSubmit = async (req, res) => {
	const { email, password } = req.body
	const user = await User.findOne({ email }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid email/password' })
	}

	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
				email: user.email
			},
			JWT_SECRET
		)
        return res.redirect('account')
        
	}

	res.json({ status: 'error', error: 'Invalid username/password' })
}
 
 

 /**
 * GET /secret
 * secret
 */
  exports.secretPage = async(req, res) => {
    res.render('secret', {title: 'Toy Car Trade - Landing Page' });
 }

  /**
 * GET /logout
 * logout
 */
   exports.logout = async(req, res) => {
    res.render('index', {title: 'Toy Car Trade - Home' });
 }
  /**
 * GET /account
 * account page
 */
exports.accountPage = async(req, res) => {
	try{
		const user = await User.find({});
    	res.render('account', {title: 'Toy Car Trade - Account Page', user });
	} catch (error) {
		res.status(500).send({message: error.message || "Error Occured"});
}
 }

   /**
 * GET /postcar
 * post car page
 */
exports.postcarPage = async(req, res) => {
		res.render('postcar', {title: 'Toy Car Trade - Post Car' });
}
 
