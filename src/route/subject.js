const express = require('express');
const subjectController = require('../controller/subjectController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../util/storageMulter');
const { route } = require('./department');

const router = express.Router();

router.post('/add', authMiddleware.verifilyTokenAndAdmin, upload.single('imgSchool'), subjectController.addSubject);
router.get('/', subjectController.getSubjects);
router.put(
    '/update/img/:id',
    authMiddleware.verifilyTokenAndAdmin,
    upload.single('imgSchool'),
    subjectController.updateImgSchool,
);
router.put('/update/:id', authMiddleware.verifilyTokenAndAdmin, subjectController.updateSubject);
router.delete('/delete/:id', authMiddleware.verifilyTokenAndAdmin, subjectController.deleteSubject);
router.get('/img/:id', subjectController.getImgSchoolById);
router.get('/get/:id', subjectController.getSubjectsByIdDepartment);
router.get('/find/:id', subjectController.getSubjectById);
module.exports = router;
