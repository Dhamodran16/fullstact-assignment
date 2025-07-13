const Faculty = require('../models/Faculty');
const { updateFacultyCount } = require('./departmentController');

// Get all faculty
const getFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find({}).sort({ createdAt: -1 });
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single faculty member
const getFacultyMember = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) {
      return res.status(404).json({ message: 'Faculty member not found' });
    }
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create faculty member
const createFaculty = async (req, res) => {
  try {
    const faculty = new Faculty(req.body);
    const savedFaculty = await faculty.save();
    
    // Update faculty count for the department
    await updateFacultyCount(req.body.department);
    
    // Emit real-time update
    if (global.io) {
      global.io.emit('facultyCreated', savedFaculty);
    }
    
    res.status(201).json(savedFaculty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update faculty member
const updateFaculty = async (req, res) => {
  try {
    const oldFaculty = await Faculty.findById(req.params.id);
    if (!oldFaculty) {
      return res.status(404).json({ message: 'Faculty member not found' });
    }

    const faculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    // Update faculty counts for both old and new departments
    if (oldFaculty.department !== req.body.department) {
      await updateFacultyCount(oldFaculty.department);
      await updateFacultyCount(req.body.department);
    }

    // Emit real-time update
    if (global.io) {
      global.io.emit('facultyUpdated', faculty);
    }

    res.json(faculty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete faculty member
const deleteFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndDelete(req.params.id);
    if (!faculty) {
      return res.status(404).json({ message: 'Faculty member not found' });
    }
    
    // Update faculty count for the department
    await updateFacultyCount(faculty.department);
    
    // Emit real-time update
    if (global.io) {
      global.io.emit('facultyDeleted', { id: req.params.id, department: faculty.department });
    }
    
    res.json({ message: 'Faculty member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getFaculty,
  getFacultyMember,
  createFaculty,
  updateFaculty,
  deleteFaculty
}; 