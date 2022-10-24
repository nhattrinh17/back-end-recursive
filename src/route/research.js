const express = require('express');
const researchController = require('../controller/researchController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../util/storageMulter');

const router = express.Router();

router.post(
    '/add',
    authMiddleware.verifilyTokenAndAdminOrLecturers,
    upload.single('file'),
    researchController.addResearchPublic,
);
router.put('/update/:id', authMiddleware.verifilyTokenAndAdminOrLecturers, researchController.updateResearchPublic);
router.put(
    '/update/file/:id',
    authMiddleware.verifilyTokenAndAdminOrLecturers,
    upload.single('file'),
    researchController.updateFileResearchPublic,
);
router.put('/update/status/:id', authMiddleware.verifilyTokenAndAdmin, researchController.setPublicOrPrivate);
router.post('/comment', authMiddleware.verifilyToken, researchController.addCommentResearch);
router.get('/comment/:id', researchController.getComment);
router.get('/file/:id', researchController.getFileResearchbyId);
router.put('/like', authMiddleware.verifilyToken, researchController.increaseLikeResearchOrComment);
router.get('/private', authMiddleware.verifilyTokenAndAdmin, researchController.getResearchPrivate);
router.get('/:id', researchController.getResearchById);
router.get('/', researchController.getResearchPublic);

module.exports = router;
