const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (rolesArray) => (req, res, next) => {
	console.log('req in rolized: ', req)
	console.log('rolesArray: ', rolesArray)
	if (!req.user) {
		return res.status(401).json({
			success: false,
			message: 'Session expired',
			code: 'SESSION_EXPIRED'
		});
	}
	const authorized = false;
	//if user has a role that is required to access any API
	// thats me kais doss
	rolesArray.forEach(role => {
		authorized = req.user.role === role;
	})
	console.log('Am I Authorized? ', authorized);
	if (authorized) {
		return next();
	}
	return res.status(401).json({
		success: false,
		message: 'Unauthorized',
	})
}