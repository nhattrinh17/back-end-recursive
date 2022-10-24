const fs = require('fs');

const examSubjects = require('../models/examSubjects');

const subjectController = {
    getSubjects: async (req, res) => {
        const { page = 1 } = req.query;
        if (req.query.name) {
            const name = req.query.name;
            examSubjects
                .find({ $text: { $search: name } }, { name: 1 })
                .skip((page - 1) * 10)
                .limit(10)
                .then((data) => res.status(200).send(data))
                .catch((eror) => {
                    return res.send(eror.message);
                });
        } else {
            examSubjects
                .find({}, { name: 1 })
                .skip((page - 1) * 10)
                .limit(10)
                .then((data) => res.status(200).send(data))
                .catch((eror) => {
                    return res.send(eror.message);
                });
        }
    },

    getSubjectsByIdDepartment: async (req, res) => {
        const idDepartment = req.params.id;
        examSubjects
            .find({ idDepartment: idDepartment }, { name: 1 })
            .then((data) => res.status(200).send(data))
            .catch((eror) => {
                return res.send(eror.message);
            });
    },

    addSubject: async (req, res) => {
        const { name, school, userCreate, idDepartment } = req.body;
        const img = fs.readFileSync(req.file.path);
        const encode_img = img.toString('base64');
        const final_img = {
            contentType: req.file.mimetype,
            data: new Buffer.from(encode_img, 'base64'),
        };
        examSubjects.findOne({ name: name, school: school, idDepartment: idDepartment }).then((data) => {
            if (data) {
                return res.status(403).send('Subject already exists');
            } else {
                const newSubject = new examSubjects({
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

    deleteSubject: async (req, res) => {
        const idSubject = req.params.id;
        examSubjects
            .findByIdAndDelete(idSubject)
            .then((data) => res.status(200).send('Delete subject successfully'))
            .catch((eror) => res.status(403).send('Delete failed subject'));
    },

    updateSubject: async (req, res) => {
        const idSubject = req.params.id;
        const { name, school, idDepartment } = req.body;
        examSubjects
            .findByIdAndUpdate(idSubject, { name, school, idDepartment })
            .then((data) => res.status(200).send('Update subject successfully'))
            .catch((eror) => res.status(403).send('Update failed subject'));
    },

    updateImgSchool: async (req, res) => {
        const idSubject = req.params.id;
        const img = fs.readFileSync(req.file.path);
        const encode_img = img.toString('base64');
        const final_img = {
            contentType: req.file.mimetype,
            data: new Buffer.from(encode_img, 'base64'),
        };

        examSubjects
            .findByIdAndUpdate(idSubject, { imgSchool: final_img })
            .then((data) => res.status(200).send('Update subject successfully'))
            .catch((eror) => res.status(403).send('Update failed subject'));
    },

    getImgSchoolById: async (req, res) => {
        const idSubject = req.params.id;
        examSubjects
            .findById(idSubject)
            .then((data) => {
                const dataImage = data.imgSchool.data;
                const imgSchool = Buffer.from(dataImage, 'base64');
                res.status(200).send({ data: imgSchool.toString('base64'), type: data.imgSchool.contentType });
            })
            .catch((eror) => res.status(403).send('Id does not exist, please try again'));
    },
};

module.exports = subjectController;
