const express = require('express');
const router = express.Router();
const {
  getFaculty,
  getFacultyMember,
  createFaculty,
  updateFaculty,
  deleteFaculty
} = require('../controllers/facultyController');

// POST new faculty member
router.post('/', createFaculty);

// GET all faculty
router.get('/', getFaculty);

// GET single faculty member
router.get('/:id', getFacultyMember);

// PUT update faculty member
router.put('/:id', updateFaculty);

// DELETE faculty member
router.delete('/:id', deleteFaculty);

module.exports = router; 