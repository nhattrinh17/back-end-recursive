const fs = require('fs');

const exam = require('../models/exam');

const examController = {
    getExams: async (req, res) => {
        const { page = 1 } = req.query;
        exam.find({}, { name: 1, isPublic: 1, createAt: 1, count: 1, idDepartment: 1, idExamSubject: 1, idUserPost: 1 })
            .skip((page - 1) * 10)
            .limit(10)
            .then((data) => res.status(200).send(data))
            .catch((eror) => {
                return res.send(eror.message);
            });
    },

    getExamById: async (req, res) => {
        const idExam = req.params.id;
        exam.findById(idExam)
            .then((data) => res.status(200).send(data))
            .catch((eror) => {
                return res.send(eror.message);
            });
    },

    getExamsBySearch: async (req, res) => {
        const { page = 1 } = req.query;
        if (req.query.name) {
            const name = req.query.name;
            exam.find(
                { $text: { $search: name } },
                { name: 1, isPublic: 1, createAt: 1, count: 1, idDepartment: 1, idExamSubject: 1, idUserPost: 1 },
            )
                .skip((page - 1) * 10)
                .limit(10)
                .then((data) => res.status(200).send(data))
                .catch((eror) => {
                    return res.send(eror.message);
                });
        } else if (req.query.idDepartment && !req.query.idExamSubject) {
            const idDepartment = req.query.idDepartment;
            exam.find(
                { idDepartment: idDepartment },
                { name: 1, isPublic: 1, createAt: 1, count: 1, idDepartment: 1, idExamSubject: 1, idUserPost: 1 },
            )
                .skip((page - 1) * 10)
                .limit(10)
                .then((data) => res.status(200).send(data))
                .catch((eror) => {
                    return res.send(eror.message);
                });
        } else if (req.query.idExamSubject && !req.query.idDepartment) {
            const idSubject = req.query.idSubject;
            exam.find(
                { idExamSubject: idSubject },
                { name: 1, isPublic: 1, createAt: 1, count: 1, idDepartment: 1, idExamSubject: 1, idUserPost: 1 },
            )
                .skip((page - 1) * 10)
                .limit(10)
                .then((data) => res.status(200).send(data))
                .catch((eror) => {
                    return res.send(eror.message);
                });
        } else {
            const idDepartment = req.query.idDepartment;
            const idSubject = req.query.idExamSubject;
            exam.find(
                { idExamSubject: idSubject, idDepartment: idDepartment },
                { name: 1, isPublic: 1, createAt: 1, count: 1, idDepartment: 1, idExamSubject: 1, idUserPost: 1 },
            )
                .skip((page - 1) * 10)
                .limit(10)
                .then((data) => res.status(200).send(data))
                .catch((eror) => {
                    return res.send(eror.message);
                });
        }
    },

    addExam: async (req, res) => {
        const idUserPost = req.user.id;
        const { name, idDepartment, idExamSubject, userPost } = req.body;
        const file = fs.readFileSync(req.file.path);
        const encode_file = file.toString('base64');
        const final_file = {
            contentType: req.file.mimetype,
            data: new Buffer.from(encode_file, 'base64'),
        };
        exam.findOne({ name: name, idExamSubject: idExamSubject, idDepartment: idDepartment }).then((data) => {
            if (data) {
                return res.status(403).send('Exam already exists');
            } else {
                const newExam = new exam({
                    name,
                    idDepartment,
                    idExamSubject,
                    fileExam: final_file,
                    idUserPost,
                    userPost,
                });
                newExam
                    .save()
                    .then((data) => res.status(200).send('Add exam successfully'))
                    .catch((eror) => res.status(403).send('Add failed exam'));
            }
        });
    },

    updateExam: async (req, res) => {
        const idExam = req.params.id;
        const { name, idDepartment, idExamSubject } = req.body;
        exam.findByIdAndUpdate(idExam, { name, idDepartment, idExamSubject })
            .then((data) => res.status(200).send('Update exam successfully'))
            .catch((eror) => res.status(403).send('Update failed exam'));
    },

    updateExamFile: async (req, res) => {
        const idExam = req.params.id;
        const file = fs.readFileSync(req.file.path);
        const encode_file = file.toString('base64');
        const final_file = {
            contentType: req.file.mimetype,
            data: new Buffer.from(encode_file, 'base64'),
        };
        exam.findByIdAndUpdate(idExam, { fileExam: final_file })
            .then((data) => res.status(200).send('Update exam file successfully'))
            .catch((eror) => res.status(403).send('Update failed exam file'));
    },

    deleteExam: async (req, res) => {
        const idExam = req.params.id;
        exam.findByIdAndDelete(idExam)
            .then((data) => res.status(200).send('Delete exam successfully'))
            .catch((eror) => res.status(403).send('Delete failed exam'));
    },

    setExamPublicOrPrivate: async (req, res) => {
        const idExam = req.params.id;
        const { isPublic } = req.body;
        exam.findByIdAndUpdate(idExam, { isPublic })
            .then((data) => res.status(200).send('Update exam status successfully'))
            .catch((eror) => res.status(403).send('Update failed exam status'));
    },

    countExamDownload: async (req, res) => {
        const idExam = req.params.id;
        exam.findById(idExam)
            .then((data) => {
                const count = data.count + 1;
                const updateCount = {
                    count: count,
                };
                exam.findByIdAndUpdate(idExam, updateCount)
                    .then((data) => res.status(200).send('Update exam count download successfully'))
                    .catch((eror) => res.status(403).send('Update failed exam count download'));
            })
            .catch((eror) => res.status(403).send('Update failed exam count download'));
    },

    getFileExamById: async (req, res) => {
        const idExam = req.params.id;
        exam.findById(idExam)
            .then((data) => {
                const dataFile = data.fileExam.data;
                const fileExam = Buffer.from(dataFile, 'base64');
                res.status(200).send({ data: fileExam.toString('base64'), type: data.fileExam.contentType });
            })
            .catch((eror) => res.status(403).send('Get file exam failed'));
    },
};

module.exports = examController;
