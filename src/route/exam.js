const express = require('express');
const examController = require('../controller/examController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../util/storageMulter');

const router = express.Router();
router.get('/', examController.getExams);
router.get('/search', examController.getExamsBySearch);
router.post('/add', authMiddleware.verifilyToken, upload.single('fileExam'), examController.addExam);
router.put('/update/:id', authMiddleware.verifilyTokenAndAdminOrAuth, examController.updateExam);
router.delete('/delete/:id', authMiddleware.verifilyTokenAndAdminOrAuth, examController.deleteExam);
router.put(
    '/update/file/:id',
    authMiddleware.verifilyTokenAndAdminOrAuth,
    upload.single('fileExam'),
    examController.updateExamFile,
);
router.put('/update/status/:id', authMiddleware.verifilyTokenAndAdmin, examController.setExamPublicOrPrivate);
router.put('/update/count/:id', examController.countExamDownload);
router.get('/get/:id', examController.getFileExamById);
module.exports = router;
