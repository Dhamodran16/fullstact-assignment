import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import DepartmentTable from './components/DepartmentTable';
import FacultyTable from './components/FacultyTable';
import { departmentAPI, facultyAPI } from './services/api';
import type { Department, Faculty } from './services/api';
import { validateDepartment, validateFaculty, getFieldError, type ValidationError } from './utils/validation';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'departments' | 'faculty'>('departments');
  const [showDepartmentForm, setShowDepartmentForm] = useState(false);
  const [showFacultyForm, setShowFacultyForm] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // State for data from API
  const [departments, setDepartments] = useState<Department[]>([]);
  const [faculty, setFaculty] = useState<Faculty[]>([]);

  const [departmentForm, setDepartmentForm] = useState({ name: '', description: '' });
  const [facultyForm, setFacultyForm] = useState({ name: '', department: '', email: '', phone: '', status: 'Active' });

  // Validation errors state
  const [departmentErrors, setDepartmentErrors] = useState<ValidationError[]>([]);
  const [facultyErrors, setFacultyErrors] = useState<ValidationError[]>([]);

  // Load data from API
  useEffect(() => {
    loadDepartments();
    loadFaculty();
  }, []);

  const loadDepartments = async () => {
    try {
      setLoading(true);
      const data = await departmentAPI.getAll();
      setDepartments(data);
    } catch (err) {
      setError('Failed to load departments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadFaculty = async () => {
    try {
      setLoading(true);
      const data = await facultyAPI.getAll();
      setFaculty(data);
    } catch (err) {
      setError('Failed to load faculty');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDepartmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateDepartment(departmentForm);
    setDepartmentErrors(errors);
    
    if (errors.length > 0) {
      return;
    }

    try {
      setLoading(true);
      if (editingDepartment) {
        const updated = await departmentAPI.update(editingDepartment._id, departmentForm);
        setDepartments(departments.map(dept => 
          dept._id === editingDepartment._id ? updated : dept
        ));
      } else {
        const newDepartment = await departmentAPI.create(departmentForm);
        setDepartments([newDepartment, ...departments]);
      }
      setShowDepartmentForm(false);
      setEditingDepartment(null);
      setDepartmentForm({ name: '', description: '' });
      setDepartmentErrors([]);
    } catch (err) {
      setError('Failed to save department');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFacultySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateFaculty(facultyForm);
    setFacultyErrors(errors);
    
    if (errors.length > 0) {
      return;
    }

    try {
      setLoading(true);
      if (editingFaculty) {
        const updated = await facultyAPI.update(editingFaculty._id, facultyForm);
        setFaculty(faculty.map(fac => 
          fac._id === editingFaculty._id ? updated : fac
        ));
      } else {
        const newFaculty = await facultyAPI.create(facultyForm);
        setFaculty([newFaculty, ...faculty]);
      }
      setShowFacultyForm(false);
      setEditingFaculty(null);
      setFacultyForm({ name: '', department: '', email: '', phone: '', status: 'Active' });
      setFacultyErrors([]);
    } catch (err) {
      setError('Failed to save faculty member');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const editDepartment = (dept: Department) => {
    setEditingDepartment(dept);
    setDepartmentForm({ name: dept.name, description: dept.description });
    setShowDepartmentForm(true);
    setDepartmentErrors([]);
  };

  const editFaculty = (fac: Faculty) => {
    setEditingFaculty(fac);
    setFacultyForm({ name: fac.name, department: fac.department, email: fac.email, phone: fac.phone, status: fac.status });
    setShowFacultyForm(true);
    setFacultyErrors([]);
  };

  const deleteDepartment = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      try {
        setLoading(true);
        await departmentAPI.delete(id);
        setDepartments(departments.filter(dept => dept._id !== id));
        // Reload faculty data to reflect the deletion of related faculty members
        await loadFaculty();
      } catch (err) {
        setError('Failed to delete department');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const deleteFaculty = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this faculty member?')) {
      try {
        setLoading(true);
        await facultyAPI.delete(id);
        setFaculty(faculty.filter(fac => fac._id !== id));
      } catch (err) {
        setError('Failed to delete faculty member');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFaculty = faculty
    .filter(fac =>
      fac.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fac.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fac.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.department.localeCompare(b.department));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Error Message */}
      {error && (
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
            <button 
              onClick={() => setError('')}
              className="float-right font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Main Content - Centered */}
      <div className="flex justify-center">
        <main className="w-full max-w-7xl px-6 py-8">
          {activeTab === 'departments' && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              {/* Departments Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Department Management</h2>
                  <p className="text-gray-600 mt-2">Manage college departments and their information</p>
                </div>
                <button
                  onClick={() => {
                    setShowDepartmentForm(true);
                    setEditingDepartment(null);
                    setDepartmentForm({ name: '', description: '' });
                    setDepartmentErrors([]);
                  }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap font-medium"
                >
                  <i className="fas fa-plus mr-2"></i>
                  Add Department
                </button>
              </div>

              {/* Search Bar */}
              <SearchBar 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search departments..."
              />

              {/* Departments Table */}
              <div className="mt-6">
                <DepartmentTable 
                  departments={filteredDepartments}
                  onEdit={editDepartment}
                  onDelete={deleteDepartment}
                />
              </div>
            </div>
          )}

          {activeTab === 'faculty' && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              {/* Faculty Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Faculty Management System</h2>
                  <p className="text-gray-600 mt-2">Manage faculty members and their department assignments</p>
                </div>
                <button
                  onClick={() => {
                    setShowFacultyForm(true);
                    setEditingFaculty(null);
                    setFacultyForm({ name: '', department: '', email: '', phone: '', status: 'Active' });
                    setFacultyErrors([]);
                  }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap font-medium"
                >
                  <i className="fas fa-plus mr-2"></i>
                  Add Faculty
                </button>
              </div>

              {/* Search Bar */}
              <SearchBar 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search faculty..."
              />

              {/* Faculty Table */}
              <div className="mt-6">
                <FacultyTable 
                  faculty={filteredFaculty}
                  onEdit={editFaculty}
                  onDelete={deleteFaculty}
                />
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Department Form Modal */}
      {showDepartmentForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative mx-auto p-8 border w-full max-w-md shadow-lg rounded-lg bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {editingDepartment ? 'Edit Department' : 'Add New Department'}
                </h3>
                <button
                  onClick={() => {
                    setShowDepartmentForm(false);
                    setDepartmentErrors([]);
                  }}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer text-xl"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <form onSubmit={handleDepartmentSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department Name</label>
                  <input
                    type="text"
                    required
                    value={departmentForm.name}
                    onChange={(e) => {
                      setDepartmentForm({ ...departmentForm, name: e.target.value });
                      // Clear error when user starts typing
                      if (getFieldError(departmentErrors, 'name')) {
                        setDepartmentErrors(departmentErrors.filter(err => err.field !== 'name'));
                      }
                    }}
                    className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      getFieldError(departmentErrors, 'name') ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter department name"
                  />
                  {getFieldError(departmentErrors, 'name') && (
                    <p className="mt-1 text-sm text-red-600">{getFieldError(departmentErrors, 'name')}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    required
                    value={departmentForm.description}
                    onChange={(e) => {
                      setDepartmentForm({ ...departmentForm, description: e.target.value });
                      // Clear error when user starts typing
                      if (getFieldError(departmentErrors, 'description')) {
                        setDepartmentErrors(departmentErrors.filter(err => err.field !== 'description'));
                      }
                    }}
                    className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      getFieldError(departmentErrors, 'description') ? 'border-red-500' : 'border-gray-300'
                    }`}
                    rows={4}
                    placeholder="Enter department description"
                  />
                  {getFieldError(departmentErrors, 'description') && (
                    <p className="mt-1 text-sm text-red-600">{getFieldError(departmentErrors, 'description')}</p>
                  )}
                </div>
                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowDepartmentForm(false);
                      setDepartmentErrors([]);
                    }}
                    className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 cursor-pointer whitespace-nowrap"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 cursor-pointer whitespace-nowrap"
                  >
                    {editingDepartment ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Faculty Form Modal */}
      {showFacultyForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative mx-auto p-8 border w-full max-w-md shadow-lg rounded-lg bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {editingFaculty ? 'Edit Faculty Member' : 'Add New Faculty Member'}
                </h3>
                <button
                  onClick={() => {
                    setShowFacultyForm(false);
                    setFacultyErrors([]);
                  }}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer text-xl"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <form onSubmit={handleFacultySubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={facultyForm.name}
                    onChange={(e) => {
                      setFacultyForm({ ...facultyForm, name: e.target.value });
                      if (getFieldError(facultyErrors, 'name')) {
                        setFacultyErrors(facultyErrors.filter(err => err.field !== 'name'));
                      }
                    }}
                    className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      getFieldError(facultyErrors, 'name') ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter full name"
                  />
                  {getFieldError(facultyErrors, 'name') && (
                    <p className="mt-1 text-sm text-red-600">{getFieldError(facultyErrors, 'name')}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <div className="relative">
                    <select
                      required
                      value={facultyForm.department}
                      onChange={(e) => {
                        setFacultyForm({ ...facultyForm, department: e.target.value });
                        if (getFieldError(facultyErrors, 'department')) {
                          setFacultyErrors(facultyErrors.filter(err => err.field !== 'department'));
                        }
                      }}
                      className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer ${
                        getFieldError(facultyErrors, 'department') ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept._id} value={dept.name}>{dept.name}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                      <i className="fas fa-chevron-down text-gray-400 text-sm"></i>
                    </div>
                  </div>
                  {getFieldError(facultyErrors, 'department') && (
                    <p className="mt-1 text-sm text-red-600">{getFieldError(facultyErrors, 'department')}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={facultyForm.email}
                    onChange={(e) => {
                      setFacultyForm({ ...facultyForm, email: e.target.value });
                      if (getFieldError(facultyErrors, 'email')) {
                        setFacultyErrors(facultyErrors.filter(err => err.field !== 'email'));
                      }
                    }}
                    className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      getFieldError(facultyErrors, 'email') ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter email address"
                  />
                  {getFieldError(facultyErrors, 'email') && (
                    <p className="mt-1 text-sm text-red-600">{getFieldError(facultyErrors, 'email')}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    required
                    value={facultyForm.phone}
                    onChange={(e) => {
                      setFacultyForm({ ...facultyForm, phone: e.target.value });
                      if (getFieldError(facultyErrors, 'phone')) {
                        setFacultyErrors(facultyErrors.filter(err => err.field !== 'phone'));
                      }
                    }}
                    className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      getFieldError(facultyErrors, 'phone') ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter phone number"
                  />
                  {getFieldError(facultyErrors, 'phone') && (
                    <p className="mt-1 text-sm text-red-600">{getFieldError(facultyErrors, 'phone')}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <div className="relative">
                    <select
                      value={facultyForm.status}
                      onChange={(e) => {
                        setFacultyForm({ ...facultyForm, status: e.target.value });
                        if (getFieldError(facultyErrors, 'status')) {
                          setFacultyErrors(facultyErrors.filter(err => err.field !== 'status'));
                        }
                      }}
                      className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer ${
                        getFieldError(facultyErrors, 'status') ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                      <i className="fas fa-chevron-down text-gray-400 text-sm"></i>
                    </div>
                  </div>
                  {getFieldError(facultyErrors, 'status') && (
                    <p className="mt-1 text-sm text-red-600">{getFieldError(facultyErrors, 'status')}</p>
                  )}
                </div>
                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowFacultyForm(false);
                      setFacultyErrors([]);
                    }}
                    className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 cursor-pointer whitespace-nowrap"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 cursor-pointer whitespace-nowrap"
                  >
                    {editingFaculty ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
