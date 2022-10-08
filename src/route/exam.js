const express = require('express');
const examController = require('../controller/examController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../util/storageMulter');

const router = express.Router();
router.get('/', examController.getExams);
router.post('/add', authMiddleware.verifilyTokenAndAdminOrLecturers, upload.single('file'), examController.addExam);

module.exports = router;
