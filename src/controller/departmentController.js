const fs = require('fs');

const department = require('../models/department');

const departmentController = {
    getDepartments: async (req, res) => {
        const { page = 1 } = req.query;
        if (req.query.name) {
            const name = req.query.name;
            department
                .find({ $text: { $search: name } }, { name: 1 })
                .then((data) => res.status(200).send(data))
                .catch((eror) => {
                    return res.send(eror.message);
                });
        } else {
            department
                .find({}, { name: 1 })
                .then((data) => res.status(200).send(data))
                .catch((eror) => {
                    return res.send(eror.message);
                });
        }
    },

    addDepartment: async (req, res) => {
        const idUser = req.user.id;
        const { name } = req.body;
        department.findOne({ name: name }).then((data) => {
            if (data) {
                return res.status(403).send('Department already exists');
            } else {
                const newDepartment = new department({
                    name,
                });
                newDepartment
                    .save()
                    .then((data) => res.status(200).send('Add department successfully'))
                    .catch((eror) => res.status(403).send('Add failed department'));
            }
        });
    },
};

module.exports = departmentController;
