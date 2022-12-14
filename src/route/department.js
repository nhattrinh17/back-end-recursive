const express = require('express');
const departmentController = require('../controller/departmentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', authMiddleware.verifilyTokenAndAdmin, departmentController.addDepartment);
router.get('/', departmentController.getDepartments);
router.delete('/delete/:id', authMiddleware.verifilyTokenAndAdmin, departmentController.deleteDepartment);
router.get('/find/:id', departmentController.getDepartmentsById);
module.exports = router;
