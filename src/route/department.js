const express = require('express');
const departmentController = require('../controller/departmentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', authMiddleware.verifilyTokenAndAdmin, departmentController.addDepartment);
router.get('/', departmentController.getDepartments);

module.exports = router;
