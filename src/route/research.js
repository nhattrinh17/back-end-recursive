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
router.put(
    '/public/update/:id',
    authMiddleware.verifilyTokenAndAdminOrLecturers,
    researchController.updateResearchPublic,
);
router.put(
    '/public/update/image/:id',
    authMiddleware.verifilyTokenAndAdminOrLecturers,
    researchController.updateImageResearchPublic,
);
router.post('/public/comment', authMiddleware.verifilyToken, researchController.addCommentResearch);
router.get('/public/comment/:id', researchController.getComment);
router.get('/public/image/:id', researchController.getImageResearchbyId);
router.put('/public/like', authMiddleware.verifilyToken, researchController.increaseLikeResearchOrComment);
router.get('/public', researchController.getResearchPublic);

module.exports = router;
