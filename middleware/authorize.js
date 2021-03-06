const jwt = require('express-jwt');
const db = require('../models');

const secret = process.env.JWT_SECRET;

const authorize = () => {
	return [
		jwt({ secret, algorithms: ['HS256'] }),

		async (req, res, next) => {
			console.log('req.user: ', req.user);
			const user = await db.User.findByPk(req.user.sub);

			if (!user) return res.status(401).json({ message: 'Unauthorized' });
			console.log('user found: ', user);

			req.user = user.get();
			console.log('authorized... req.user: ', req.user);
			next();
		},
	];
};

module.exports = authorize;
