const express = require('express');
const examController = require('../controller/examController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../util/storageMulter');

const router = express.Router();
router.get('/', examController.getExams);
router.get('/search', examController.getExamsBySearch);
router.post('/add', authMiddleware.verifilyTokenAndAdminOrLecturers, upload.single('fileExam'), examController.addExam);
router.put('/update/:id', authMiddleware.verifilyTokenAndAdminOrAuth, examController.updateExam);
router.delete('/delete/:id', authMiddleware.verifilyTokenAndAdminOrAuth, examController.deleteExam);
router.put(
    '/update/file/:id',
    authMiddleware.verifilyTokenAndAdminOrAuth,
    upload.single('fileExam'),
    examController.updateExamFile,
);

module.exports = router;
