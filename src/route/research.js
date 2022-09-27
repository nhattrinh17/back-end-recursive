const express = require('express');
const researchController = require('../controller/researchController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../util/storageMulter');

const router = express.Router();

router.post(
    '/public/add',
    authMiddleware.verifilyTokenAndAdminOrLecturers,
    upload.single('image'),
    researchController.addResearchPublic,
);
router.get('/public', researchController.getResearchPublic);

module.exports = router;
