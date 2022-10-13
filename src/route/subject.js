const express = require('express');
const subjectController = require('../controller/subjectController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../util/storageMulter');

const router = express.Router();

router.post('/add', authMiddleware.verifilyTokenAndAdmin, upload.single('imgSchool'), subjectController.addSubject);
router.get('/', subjectController.getSubjects);
router.put(
    '/update/img/:id',
    authMiddleware.verifilyTokenAndAdmin,
    upload.single('imgSchool'),
    subjectController.updateSubject,
);
router.put('/update/:id', authMiddleware.verifilyTokenAndAdmin, subjectController.updateSubject);
router.delete('/delete/:id', authMiddleware.verifilyTokenAndAdmin, subjectController.deleteSubject);

module.exports = router;
