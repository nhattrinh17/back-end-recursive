const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

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
                expiresIn: '1d',
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

    userRegister: async (req, res) => {
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

    getUserByObject: async (req, res) => {
        const type = req.query.type;
        if (type == 'student') {
            User.find({ isStudent: true })
                .then((data) => res.status(200).send(data))
                .catch((error) => res.status(404).send('Unable to retrieve data from database, please try again'));
        } else if (type == 'lecturers') {
            User.find({ isLecturers: true })
                .then((data) => res.status(200).send(data))
                .catch((error) => res.status(404).send('Unable to retrieve data from database, please try again'));
        } else {
            return res.status(404).send('This object does not exist, please try again');
        }
    },

    getUserById: async (req, res) => {
        const idUser = req.params.id;
        User.findById(idUser)
            .then((data) => {
                const { firstName, lastName, email, codeSudentOrLecturers } = data;
                const dataResponse = { firstName, lastName, email, codeSudentOrLecturers };
                return res.status(200).send(dataResponse);
            })
            .catch((error) => res.status(403).send('Id does not exist, please try again'));
    },

    getAvatarUserById: async (req, res) => {
        const idUser = req.params.id;
        User.findById(idUser)
            .then((data) => {
                const dataImage = data.avatar.image;
                const img = Buffer.from(dataImage, 'base64');
                res.writeHead(200, {
                    'Content-Type': data.avatar.contentType,
                    'Content-Length': img.length,
                });
                res.end(img);
            })
            .catch((error) => res.status(403).send('Id does not exist, please try again'));
    },

    updateUser: async (req, res) => {
        const { firstName, lastName, email, codeSudentOrLecturers } = req.body;
        User.findById(req.params.id).then((data) => {
            const newUser = {
                firstName,
                lastName,
                email,
                codeSudentOrLecturers,
                updateAt: Date.now(),
            };
            User.updateOne({ _id: req.params.id }, newUser)
                .then((data) => {
                    res.send('User profile update successful');
                })
                .catch((error) => res.status(403).send('User information correction failed'));
        });
    },

    updateAvatarUser: async (req, res) => {
        User.findById(req.params.id).then((data) => {
            const img = fs.readFileSync(req.file.path);
            const encode_img = img.toString('base64');
            const final_img = {
                contentType: req.file.mimetype,
                image: new Buffer.from(encode_img, 'base64'),
            };
            const newUser = {
                avatar: final_img,
            };
            User.updateOne({ _id: req.params.id }, newUser)
                .then((data) => {
                    res.send('User profile update successful');
                })
                .catch((error) => res.status(403).send('User information correction failed'));
        });
    },

    deleteUser: async (req, res) => {
        const idUser = req.params.id;
        User.findByIdAndDelete(idUser)
            .then((data) => res.status(200).send('Delete user successfully'))
            .catch((error) => res.status(403).send('Delete user failed'));
    },
};

module.exports = userController;
