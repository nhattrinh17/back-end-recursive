const fs = require('fs');

const exam = require('../models/exam');

const examController = {
    getExams: async (req, res) => {
        const { page = 1 } = req.query;
        exam.find({}, { name: 1 })
            .skip((page - 1) * 10)
            .limit(10)
            .then((data) => res.status(200).send(data))
            .catch((eror) => {
                return res.send(eror.message);
            });
    },

    getExamsBySearch: async (req, res) => {
        const { page = 1 } = req.query;
        if (req.query.name) {
            const name = req.query.name;
            exam.find({ $text: { $search: name } }, { name: 1 })
                .skip((page - 1) * 10)
                .limit(10)
                .then((data) => res.status(200).send(data))
                .catch((eror) => {
                    return res.send(eror.message);
                });
        } else if (req.query.idDepartment) {
            const idDepartment = req.query.idDepartment;
            exam.find({ idDepartment: idDepartment }, { name: 1, idDepartment: 1 })
                .skip((page - 1) * 10)
                .limit(10)
                .then((data) => res.status(200).send(data))
                .catch((eror) => {
                    return res.send(eror.message);
                });
        } else if (req.query.idDepartment && req.query.subject) {
            const idDepartment = req.query.idDepartment;
            const idSubject = req.query.idSubject;
            exam.find({ idDepartment: idDepartment, idSubject: idSubject }, { name: 1, idSubject: 1, idDepartment: 1 })
                .skip((page - 1) * 10)
                .limit(10)
                .then((data) => res.status(200).send(data))
                .catch((eror) => {
                    return res.send(eror.message);
                });
        }
    },

    addExam: async (req, res) => {
        const { name, idSubject, idDepartment } = req.body;
        const file = fs.readFileSync(req.file.path);
        const encode_file = file.toString('base64');
        const final_file = {
            contentType: req.file.mimetype,
            data: new Buffer.from(encode_file, 'base64'),
        };
        exam.findOne({ name: name, idSubject: idSubject, idDepartment: idDepartment }).then((data) => {
            if (data) {
                return res.status(403).send('Exam already exists');
            } else {
                const newExam = new exam({
                    name,
                    idSubject,
                    idDepartment,
                    file: final_file,
                });
                newExam
                    .save()
                    .then((data) => res.status(200).send('Add exam successfully'))
                    .catch((eror) => res.status(403).send('Add failed exam'));
            }
        });
    },
};

module.exports = examController;
