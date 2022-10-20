const express = require('express');
const userController = require('../controller/useController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../util/storageMulter');

const router = express.Router();

router.post('/register', userController.userRegister);
router.post('/login', userController.userLogin);
router.get('/logout', authMiddleware.verifilyToken, userController.userLogout);
router.put('/update/:id', authMiddleware.verifilyTokenAndAdminOrAuth, userController.updateUser);
router.put(
    '/update/avatar/:id',
    authMiddleware.verifilyTokenAndAdminOrAuth,
    upload.single('avatar'),
    userController.updateAvatarUser,
);
router.get('/avatar/:id', userController.getAvatarUserById);
router.delete('/delete/:id', authMiddleware.verifilyTokenAndAdmin, userController.deleteUser);
router.get('/:id', userController.getUserById);
router.get('/', authMiddleware.verifilyTokenAndAdmin, userController.getUserByObject);

module.exports = router;
