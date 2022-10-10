const express = require('express');
const researchController = require('../controller/researchController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../util/storageMulter');

const router = express.Router();

router.post(
    '/add',
    authMiddleware.verifilyTokenAndAdminOrLecturers,
    upload.single('image'),
    researchController.addResearchPublic,
);
router.put('/update/:id', authMiddleware.verifilyTokenAndAdminOrLecturers, researchController.updateResearchPublic);
router.put(
    '/update/image/:id',
    authMiddleware.verifilyTokenAndAdminOrLecturers,
    upload.single('image'),
    researchController.updateImageResearchPublic,
);
router.post('/comment', authMiddleware.verifilyToken, researchController.addCommentResearch);
router.get('/comment/:id', researchController.getComment);
router.get('/image/:id', researchController.getImageResearchbyId);
router.put('/like', authMiddleware.verifilyToken, researchController.increaseLikeResearchOrComment);
router.get('/', researchController.getResearchPublic);

module.exports = router;
