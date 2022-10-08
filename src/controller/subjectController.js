const fs = require('fs');

const subject = require('../models/examSubject');

const subjectController = {
    getSubjects: async (req, res) => {
        const { page = 1 } = req.query;
        if (req.query.name) {
            const name = req.query.name;
            subject
                .find({ $text: { $search: name } }, { name: 1 })
                .then((data) => res.status(200).send(data))
                .catch((eror) => {
                    return res.send(eror.message);
                });
        } else {
            subject
                .find({}, { name: 1 })
                .then((data) => res.status(200).send(data))
                .catch((eror) => {
                    return res.send(eror.message);
                });
        }
    },

    addSubject: async (req, res) => {
        const idUser = req.user.id;
        const { name, school, userCreate, idDepartment } = req.body;
        const img = fs.readFileSync(req.file.path);
        const encode_img = img.toString('base64');
        const final_img = {
            contentType: req.file.mimetype,
            data: new Buffer.from(encode_img, 'base64'),
        };
        subject.findOne({ name: name, school: school, idDepartment: idDepartment }).then((data) => {
            if (data) {
                return res.status(403).send('Subject already exists');
            } else {
                const newSubject = new subject({
                    name,
                    school,
                    imgSchool: final_img,
                    userCreate,
                    idDepartment,
                });
                newSubject
                    .save()
                    .then((data) => res.status(200).send('Add subject successfully'))
                    .catch((eror) => res.status(403).send('Add failed subject'));
            }
        });
    },
};

module.exports = subjectController;
