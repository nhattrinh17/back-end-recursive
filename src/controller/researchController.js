const fs = require('fs');

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
            .catch((error) => res.status(403).send(error.message));
    },

    getResearchPublic: async (req, res) => {
        const { page = 1 } = req.query;
        if (req.query.name) {
            const name = req.query.name;
            // SientificResearchAvailable.ensureIndexes({ name: 'text' });
            SientificResearchAvailable.find({ $text: { $search: name } }, { name: 1, description: 1, scored: 1 })
                .then((data) => res.status(200).send(data))
                .catch((eror) => {
                    return res.send(eror.message);
                });
        } else {
            SientificResearchAvailable.find({}, { name: 1, description: 1, scored: 1 })
                .then((data) => res.status(200).send(data))
                .catch((eror) => {
                    return res.send(eror.message);
                });
        }
    },
};

module.exports = researchController;
