const express = require('express');
const userController = require('../controller/useController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', userController.userRerister);
router.post('/login', userController.userLogin);
router.get('/logout', authMiddleware.verifilyToken, userController.userLogout);

module.exports = router;
