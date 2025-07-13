const express = require('express');
const router = express.Router();
const {
  getDepartments,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment
} = require('../controllers/departmentController');

// POST new department
router.post('/', createDepartment);

// GET all departments
router.get('/', getDepartments);

// GET single department
router.get('/:id', getDepartment);

// PUT update department
router.put('/:id', updateDepartment);

// DELETE department
router.delete('/:id', deleteDepartment);

module.exports = router; 