const jwt = require('jsonwebtoken');

const UserToken = require('../models/userToken');

const authMiddleware = {
    verifilyToken: async (req, res, next) => {
        const idToken = req.headers.idtoken;
        if (idToken) {
            await UserToken.findById(idToken)
                .then(async (data) => {
                    const token = data.tokenUser;
                    const JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY;
                    jwt.verify(token, JWT_ACCESS_KEY, function (error, user) {
                        if (user) {
                            req.idToken = idToken;
                            req.user = user;
                            next();
                        } else {
                            return res.status(403).send('Invalid token');
                        }
                    });
                })
                .catch((error) => res.status(403).send('Id does not exist'));
        } else {
            return res.status(404).send('Please try again later or login again');
        }
    },
    verifilyTokenAndAdmin: async (req, res, next) => {
        authMiddleware.verifilyToken(req, res, () => {
            if (req.user.isAdmin) {
                next();
            } else {
                return res.status(403).send('You are not authorized to perform this action');
            }
        });
    },
    verifilyTokenAndAdminOrAuth: async (req, res, next) => {
        const idUser = req.params.id;
        authMiddleware.verifilyToken(req, res, () => {
            if (req.user.isAdmin || req.user.id == idUser) {
                next();
            } else {
                return res.status(403).send('You are not authorized to perform this action');
            }
        });
    },
    verifilyTokenAndAdminOrLecturers: async (req, res, next) => {
        authMiddleware.verifilyToken(req, res, () => {
            if (req.user.isAdmin || req.user.is.isLecturers) {
                next();
            } else {
                return res.status(403).send('You are not authorized to perform this action');
            }
        });
    },
};

module.exports = authMiddleware;
