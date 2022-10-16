const fs = require('fs');

const ExamAndResearchFeedback = require('../models/examAndResearchFeedback');
const SientificResearchAvailable = require('../models/scientificResearchAvailable');

const researchController = {
    addResearchPublic: async (req, res) => {
        const idUser = req.user.id;
        const { name, description, scored } = req.body;
        const file = fs.readFileSync(req.file.path);
        const encode_file = file.toString('base64');
        const final_file = {
            contentType: req.file.mimetype,
            data: new Buffer.from(encode_file, 'base64'),
        };
        const newsSientificResearchAvailable = new SientificResearchAvailable({
            idUser,
            name,
            description,
            file: final_file,
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

    updateFileResearchPublic: async (req, res) => {
        const idResearch = req.params.id;
        const file = fs.readFileSync(req.file.path);
        const encode_img = file.toString('base64');
        const final_file = {
            contentType: req.file.mimetype,
            data: new Buffer.from(encode_img, 'base64'),
        };
        const updateFile = {
            file: final_file,
        };
        SientificResearchAvailable.updateOne({ _id: idResearch }, updateFile)
            .then((data) => res.status(200).send('Success research update file'))
            .catch((error) => res.status(403).send('Failed research update file'));
    },

    setPublicOrPrivate: async (req, res) => {
        const idResearch = req.params.id;
        const isPublic = req.body.isPublic;
        const dataUpdate = {
            idPublic: isPublic,
        };
        SientificResearchAvailable.updateOne({ _id: idResearch }, dataUpdate)
            .then((data) => res.status(200).send('Success research update '))
            .catch((error) => res.status(403).send('Failed research update'));
    },

    getFileResearchbyId: async (req, res) => {
        const idResearch = req.params.id;
        // res.send(idResearch);
        SientificResearchAvailable.findById(idResearch)
            .then((data) => {
                const dataFile = data.file;
                // const file = Buffer.from(dataFile, 'base64');
                // res.writeHead(200, {
                //     'Content-Type': data.file.contentType,
                //     'Content-Length': file.length,
                // });
                res.status(200).send(dataFile);
            })
            .catch((error) => res.status(403).send(error.message));
        // .catch((error) => res.status(403).send('Id does not exist, please try again'));
    },

    getResearchById: async (req, res) => {
        const id = req.params.id;
        SientificResearchAvailable.findById(id)
            .then((data) => {
                const { name, description, countLike, scored, createAt } = data;
                const dataRes = { name, description, countLike, scored, createAt };
                return res.status(200).send(dataRes);
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
        const { idArticleOrExam, comment } = req.body;
        const newComment = {
            idUserComment,
            idArticleOrExam,
            comment,
        };
        ExamAndResearchFeedback.create(newComment)
            .then((data) => res.status(200).send('Add comment successfully'))
            .catch((eror) => res.status(403).send(eror.message));
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
