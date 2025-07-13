const Department = require('../models/Department');
const Faculty = require('../models/Faculty');

// Helper function to update faculty count for a department
const updateFacultyCount = async (departmentName) => {
  try {
    const count = await Faculty.countDocuments({ department: departmentName });
    const updatedDepartment = await Department.findOneAndUpdate(
      { name: departmentName },
      { facultyCount: count },
      { new: true }
    );
    
    // Emit real-time update
    if (global.io && updatedDepartment) {
      global.io.emit('departmentUpdated', updatedDepartment);
    }
    
    return updatedDepartment;
  } catch (error) {
    console.error('Error updating faculty count:', error);
  }
};

// Get all departments
const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find({}).sort({ createdAt: -1 });
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single department
const getDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create department
const createDepartment = async (req, res) => {
  try {
    const department = new Department(req.body);
    const savedDepartment = await department.save();
    
    // Emit real-time update
    if (global.io) {
      global.io.emit('departmentCreated', savedDepartment);
    }
    
    res.status(201).json(savedDepartment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update department
const updateDepartment = async (req, res) => {
  try {
    const oldDepartment = await Department.findById(req.params.id);
    if (!oldDepartment) {
      return res.status(404).json({ message: 'Department not found' });
    }

    const department = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    // If department name changed, update faculty records
    if (oldDepartment.name !== department.name) {
      await Faculty.updateMany(
        { department: oldDepartment.name },
        { department: department.name }
      );
      await updateFacultyCount(department.name);
    }

    // Emit real-time update
    if (global.io) {
      global.io.emit('departmentUpdated', department);
    }

    res.json(department);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete department
const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    // Delete all faculties related to this department
    await Faculty.deleteMany({ department: department.name });
    
    // Emit real-time update
    if (global.io) {
      global.io.emit('departmentDeleted', { id: req.params.id, name: department.name });
    }
    
    res.json({ message: 'Department and related faculties deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDepartments,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  updateFacultyCount
}; 