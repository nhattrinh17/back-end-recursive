const fs = require('fs');

const exam = require('../models/exam');
const subject = require('../models/examSubject');
const department = require('../models/department');
const examSubjects = require('../models/examSubjects');

const examController = {
    getExams: async (req, res) => {
        const { page = 1 } = req.query;
        if (req.query.name) {
            const name = req.query.name;
            examSubjects
                .find({ $text: { $search: name } }, { name: 1, school: 1, imgSchool: 1 })
                .then((data) => res.status(200).send(data))
                .catch((eror) => {
                    return res.send(eror.message);
                });
        } if (req.query.department) {
            const departmentRq = req.query.department;
            exam
                .find({ idExamSubject: examSubjects.find({ idDepartment: departmentRq})}, {fileExam: 1})
                .then((data) => res.status(200).send(data))
                .catch((eror) => {
                    return res.send(eror.message);
                });
        } else {
            exam
                .find({}, { name: 1, fileExam: 1 })
                .then((data) => res.status(200).send(data))
                .catch((eror) => {
                    return res.send(eror.message);
                });
        }
        
    },

}