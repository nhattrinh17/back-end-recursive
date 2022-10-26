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
        exam.findById(idExam, {
            name: 1,
            isPublic: 1,
            createAt: 1,
            count: 1,
            idDepartment: 1,
            idExamSubject: 1,
            idUserPost: 1,
        })
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
        const { name, idDepartment, idExamSubject, userPost, fileExam } = req.body;
        file = fileExam.split(';base64,');
        file[0] = fileExam[0].split(':')[1];
        // const file = fs.readFileSync(req.file.path);
        // const encode_file = file.toString('base64');
        ///data:application/octet-stream;base64,aW1wb3J0IGphdmEuaW8uQnVmZmVyZWRSZWFkZXI7DQppbXBvcnQgamF2YS5pby5CdWZmZXJlZFdyaXRlcjsNCmltcG9ydCBqYXZhLmlvLklPRXhjZXB0aW9uOw0KaW1wb3J0IGphdmEuaW8uSW5wdXRTdHJlYW1SZWFkZXI7DQppbXBvcnQgamF2YS5pby5PdXRwdXRTdHJlYW1Xcml0ZXI7DQppbXBvcnQgamF2YS51dGlsLkFycmF5czsNCg0KcHVibGljIGNsYXNzIHRlc3Qgew0KICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBtYWluKFN0cmluZ1tdIGFyZ3MpIHRocm93cyBJT0V4Y2VwdGlvbiB7DQogICAgICAgIEJ1ZmZlcmVkUmVhZGVyIGJyID0gbmV3IEJ1ZmZlcmVkUmVhZGVyKG5ldyBJbnB1dFN0cmVhbVJlYWRlcihTeXN0ZW0uaW4pKTsNCiAgICAgICAgQnVmZmVyZWRXcml0ZXIgYncgPSBuZXcgQnVmZmVyZWRXcml0ZXIobmV3IE91dHB1dFN0cmVhbVdyaXRlcihTeXN0ZW0ub3V0KSk7DQoNCiAgICAgICAgU3RyaW5nIFtdIGlucHV0ID0gYnIucmVhZExpbmUoKS5zcGxpdCgiICIpOw0KICAgICAgICBpbnQgbiA9IEludGVnZXIucGFyc2VJbnQoaW5wdXRbMF0pOw0KICAgICAgICBpbnQgbWF4RnJDYW5CZU1vdmUgPSBJbnRlZ2VyLnBhcnNlSW50KGlucHV0WzFdKTsNCiAgICAgICAgU3RyaW5nIFtdIG5hbWVBcnIgPSBuZXcgU3RyaW5nW25dOyANCiAgICAgICAgaW50IFtdIHZhbHVlQXJyID0gbmV3IGludFtuXTsNCiAgICAgICAgaW50IHJlc3VsdCA9IDA7DQoNCiAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBuOyBpKyspIHsNCiAgICAgICAgICAgIFN0cmluZyBbXSBGcmVuID0gYnIucmVhZExpbmUoKS5zcGxpdCgiICIpOw0KICAgICAgICAgICAgbmFtZUFycltpXSA9IEZyZW5bMF07DQogICAgICAgICAgICB2YWx1ZUFycltpXSA9IEludGVnZXIucGFyc2VJbnQoRnJlblsxXSk7DQogICAgICAgIH0NCg0KICAgICAgICBBcnJheXMuc29ydCh2YWx1ZUFycik7DQoNCg0KICAgICAgICBpbnQgdGVtcCA9IDA7DQogICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgbiAtIDE7IGkrKykgew0KICAgICAgICAgICAgZm9yIChpbnQgaiA9IGkgKyAxOyBqIDwgbjsgaisrKSB7DQogICAgICAgICAgICAgICAgaWYgKHZhbHVlQXJyW2ldID4gdmFsdWVBcnJbal0pIHsNCiAgICAgICAgICAgICAgICAgICAgdGVtcCA9IHZhbHVlQXJyW2ldOw0KICAgICAgICAgICAgICAgICAgICB2YWx1ZUFycltpXSA9IHZhbHVlQXJyW2pdOw0KICAgICAgICAgICAgICAgICAgICB2YWx1ZUFycltqXSA9IHRlbXA7DQogICAgICAgICAgICAgICAgfQ0KICAgICAgICAgICAgfQ0KICAgICAgICB9DQogICAgICAgIA0KICAgICAgICBmb3IgKGludCBpID0gbiAtIDE7IGkgPj0gbiAtIG1heEZyQ2FuQmVNb3ZlOyBpLS0pIHsNCiAgICAgICAgICAgIHJlc3VsdCArPSB2YWx1ZUFycltpXTsNCiAgICAgICAgfQ0KICAgICAgICBTeXN0ZW0ub3V0LnByaW50bG4ocmVzdWx0KTsNCiAgICB9DQp9DQo=
        // console.log(encode_file);
        const final_file = {
            contentType: file[0],
            data: new Buffer.from(file[1], 'base64'),
        };
        console.log(final_file);
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
