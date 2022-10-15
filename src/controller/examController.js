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
        } else if (req.query.idDepartment && !req.query.idExamSubject) {
            const idDepartment = req.query.idDepartment;
            exam.find({ idDepartment: idDepartment }, { name: 1, idDepartment: 1 })
                .skip((page - 1) * 10)
                .limit(10)
                .then((data) => res.status(200).send(data))
                .catch((eror) => {
                    return res.send(eror.message);
                });
        } else if (req.query.idExamSubject && !req.query.idDepartment) {
            const idExamSubject = req.query.idExamSubject;
            exam.find({ idExamSubject: idExamSubject }, { name: 1, idExamSubject: 1 })
                .skip((page - 1) * 10)
                .limit(10)
                .then((data) => res.status(200).send(data))
                .catch((eror) => {
                    return res.send(eror.message);
                });
        } else {
            const idDepartment = req.query.idDepartment;
            const idExamSubject = req.query.idExamSubject;
            exam.find(
                { idExamSubject: idExamSubject, idDepartment: idDepartment },
                { name: 1, idSubject: 1, idDepartment: 1 },
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
        const updateFile = {
            fileExam: final_file,
        };
        exam.findByIdAndUpdate(idExam, updateFile)
            .then((data) => res.status(200).send('Update exam file successfully'))
            .catch((eror) => res.status(403).send('Update failed exam file'));
    },

    deleteExam: async (req, res) => {
        const idExam = req.params.id;
        exam.findByIdAndDelete(idExam)
            .then((data) => res.status(200).send('Delete exam successfully'))
            .catch((eror) => res.status(403).send('Delete failed exam'));
    },

    setExamPublic: async (req, res) => {
        const idExam = req.params.id;
        const isPublic = req.body.isPublic;
        const updatePublic = {
            isPublic: isPublic,
        };
        exam.findByIdAndUpdate(idExam, updatePublic)
            .then((data) => res.status(200).send('Update exam public successfully'))
            .catch((eror) => res.status(403).send('Update failed exam public'));
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
};

module.exports = examController;
