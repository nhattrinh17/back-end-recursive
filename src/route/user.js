const express = require('express');
const userController = require('../controller/useController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../util/storageMulter');

const router = express.Router();

router.post('/register', userController.userRegister);
router.post('/login', userController.userLogin);
router.get('/logout', authMiddleware.verifilyToken, userController.userLogout);
router.put(
    '/update/:id',
    authMiddleware.verifilyTokenAndAdminOrAuth,
    upload.single('avatar'),
    userController.updateUser,
);
router.get('/avatar/:id', authMiddleware.verifilyTokenAndAdminOrAuth, userController.getAvatarUserById);
router.get('/:id', authMiddleware.verifilyTokenAndAdminOrAuth, userController.getUserById);
router.delete('/delete/:id', authMiddleware.verifilyTokenAndAdmin, userController.deleteUser);
router.get('/', authMiddleware.verifilyTokenAndAdmin, userController.getUserByObject);

module.exports = router;
