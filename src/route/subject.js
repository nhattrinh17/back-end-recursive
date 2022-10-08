const express = require('express');
const subjectController = require('../controller/subjectController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../util/storageMulter');

const router = express.Router();

router.post(
    '/add',
    authMiddleware.verifilyTokenAndAdminOrLecturers,
    upload.single('image'),
    subjectController.addSubject,
);
router.get('/', subjectController.getSubjects);

module.exports = router;
