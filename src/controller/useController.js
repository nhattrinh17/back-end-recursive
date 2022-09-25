const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const UserToken = require('../models/userToken');

const userController = {
    // GENERATE ACCESS TOKEN
    generateAccessToken: (user) => {
        return jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
                isUser: user.isUser,
                isInstructor: user.isInstructor,
                isExamTeacher: user.isExamTeacher,
                isStudent: user.isStudent,
            },
            process.env.JWT_ACCESS_KEY,
            {
                expiresIn: '10m',
            },
        );
    },

    // GENERATE REFRESH TOKEN
    generateRefreshToken: (user) => {
        return jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
                isUser: user.isUser,
                isInstructor: user.isInstructor,
                isExamTeacher: user.isExamTeacher,
                isStudent: user.isStudent,
            },
            process.env.JWT_REFRESH_KEY,
            {
                expiresIn: '7d',
            },
        );
    },

    userRerister: async (req, res) => {
        const { firstName, lastName, email, password, codeSudentOrLecturers } = req.body;
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashed = await bcrypt.hash(password, salt);
        User.findOne({ email: email }).then((data) => {
            if (data) {
                return res.status(401).send('This email already exists. Please try again');
            } else {
                const newUser = new User({
                    firstName,
                    lastName,
                    email,
                    password: hashed,
                    codeSudentOrLecturers,
                    isAdmin: false,
                    isInstructor: false,
                    isExamTeacher: false,
                    isStudent: true,
                });
                newUser
                    .save()
                    .then((data) => {
                        return res.status(200).send('Account Created Successfully');
                    })
                    .catch((error) => {
                        return res.status(403).send('Account creation failed. Please try again');
                    });
            }
        });
    },

    userLogin: async (req, res) => {
        const { email, password } = req.body;
        User.findOne({ email: email }).then(async (user) => {
            if (!user) {
                return res
                    .status(401)
                    .send('The email you entered does not match any accounts. Please register an account');
            } else {
                const match = await bcrypt.compare(password, user.password);
                if (match) {
                    const idUser = user._id;
                    const { firstName, lastName, email, avatar } = user;
                    const accessToken = userController.generateAccessToken(user);
                    const newTokenUser = new UserToken({
                        idUser,
                        tokenUser: accessToken,
                    });
                    newTokenUser.save().then((tokenUser) => {
                        const refreshToken = userController.generateRefreshToken(user);
                        const dataResponse = {
                            idUser,
                            firstName,
                            lastName,
                            email,
                            avatar,
                            idToken: tokenUser._id,
                            refreshToken,
                        };
                        return res.status(200).send(dataResponse);
                    });
                } else {
                    return res.status(403).send('Email or password is invalid. Please try again');
                }
            }
        });
    },

    userLogout: async (req, res) => {
        const idToken = req.idToken;
        UserToken.findByIdAndDelete(idToken)
            .then((data) => res.status(200).send('Sign out successful'))
            .catch((error) => res.status(400).send('Logout failed, please try again later'));
    },
};

module.exports = userController;
