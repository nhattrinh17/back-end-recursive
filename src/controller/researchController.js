const fs = require('fs');

const ExamAndResearchFeedback = require('../models/examAndResearchFeedback');
const SientificResearchAvailable = require('../models/scientificResearchAvailable');

const researchController = {
    addResearchPublic: async (req, res) => {
        const idUser = req.user.id;
        const { name, description, scored } = req.body;
        const img = fs.readFileSync(req.file.path);
        const encode_img = img.toString('base64');
        const final_img = {
            contentType: req.file.mimetype,
            data: new Buffer.from(encode_img, 'base64'),
        };
        const newsSientificResearchAvailable = new SientificResearchAvailable({
            idUser,
            name,
            description,
            image: final_img,
            scored,
        });
        newsSientificResearchAvailable
            .save()
            .then((data) => res.status(200).send('Create a successful scientific paper'))
            .catch((error) => res.status(403).send('Retrieving the article failed'));
    },

    updateResearchPublic: async (req, res) => {
        const idResearch = req.params.id;
        const { name, description, scored } = req.body;
        const updateSientificResearchAvailable = {
            name,
            description,
            scored,
        };
        SientificResearchAvailable.updateOne({ _id: idResearch }, updateSientificResearchAvailable)
            .then((data) => res.status(200).send('Success research update'))
            .catch((error) => res.status(403).send('Failed research update'));
    },

    updateImageResearchPublic: async (req, res) => {
        const idResearch = req.params.id;
        const img = fs.readFileSync(req.file.path);
        const encode_img = img.toString('base64');
        const final_img = {
            contentType: req.file.mimetype,
            data: new Buffer.from(encode_img, 'base64'),
        };
        const updateImage = {
            final_img,
        };
        SientificResearchAvailable.updateOne({ _id: idResearch }, updateImage)
            .then((data) => res.status(200).send('Success research update image'))
            .catch((error) => res.status(403).send('Failed research update image'));
    },

    getImageResearchbyId: async (req, res) => {
        const idResearch = req.params.id;
        // res.send(idResearch);
        SientificResearchAvailable.findById(idResearch)
            .then((data) => {
                const dataImage = data.image.data;
                const img = Buffer.from(dataImage, 'base64');
                res.writeHead(200, {
                    'Content-Type': data.image.contentType,
                    'Content-Length': img.length,
                });
                res.end(img);
            })
            .catch((error) => res.status(403).send('Id does not exist, please try again'));
    },

    getResearchById: async (req, res) => {
        const id = req.params.id;
        SientificResearchAvailable.findById(id)
            .then((data) => {
                return res.status(200).send(data);
            })
            .catch((error) => {
                return res.status(403).send('Id does not exist, please try again');
            });
    },

    getResearchPublic: async (req, res) => {
        const { page = 1 } = req.query;
        if (req.query.name) {
            const name = req.query.name;
            // SientificResearchAvailable.ensureIndexes({ name: 'text' });
            SientificResearchAvailable.find(
                { $text: { $search: name } },
                { name: 1, description: 1, scored: 1, countLike: 1 },
            )
                .skip((page - 1) * 10)
                .limit(10)
                .then((data) => res.status(200).send(data))
                .catch((eror) => {
                    return res.send(eror.message);
                });
        } else {
            SientificResearchAvailable.find({}, { name: 1, description: 1, scored: 1, countLike: 1 })
                .skip((page - 1) * 10)
                .limit(10)
                .then((data) => res.status(200).send(data))
                .catch((eror) => {
                    return res.send(eror.message);
                });
        }
    },

    addCommentResearch: async (req, res) => {
        const idUserComment = req.user.id;
        const { idArticleOrExam, commnet } = req.body;
        const newComment = new ExamAndResearchFeedback({
            idUserComment,
            idArticleOrExam,
            commnet,
        });
        newComment
            .save()
            .then((data) => res.status(200).send('Add comment successfully'))
            .catch((eror) => res.status(403).send('Add failed comment', newComment));
    },

    getComment: async (req, res) => {
        const idResearchOrExam = req.params.id;
        ExamAndResearchFeedback.find({ IdArticleOrExam: idResearchOrExam })
            .then((data) => {
                return res.status(200).send(data);
            })
            .catch((error) => res.status(403).send('Article or exam id does not exist'));
    },

    increaseLikeResearchOrComment: async (req, res) => {
        const { idReaechOrComment, type } = req.body;
        if (type === 'research') {
            SientificResearchAvailable.findById(idReaechOrComment)
                .then((data) => {
                    const countLike = data.countLike;
                    SientificResearchAvailable.findByIdAndUpdate(idReaechOrComment, { countLike: countLike + 1 })
                        .then((data) => res.status(200).send('Increase Like Success'))
                        .catch((error) => res.status(403).send('Increase Like failed'));
                })
                .catch((error) => res.status(403).send('Invalid research id'));
        } else if (type === 'comment') {
            ExamAndResearchFeedback.findById(idReaechOrComment)
                .then((data) => {
                    const countLike = data.countLike;
                    ExamAndResearchFeedback.findByIdAndUpdate(idReaechOrComment, { countLike: countLike + 1 })
                        .then((data) => res.status(200).send('Increase Like Success'))
                        .catch((error) => res.status(403).send('Increase Like failed'));
                })
                .catch((error) => res.status(403).send('Invalid research id'));
        }
    },
};

module.exports = researchController;
