import React from 'react';
import type { Department } from '../services/api';

type DepartmentTableProps = {
  departments: Department[];
  onEdit: (dept: Department) => void;
  onDelete: (id: string) => void;
};

const DepartmentTable: React.FC<DepartmentTableProps> = ({ departments, onEdit, onDelete }) => (
  <div className="bg-white shadow-sm rounded-lg overflow-hidden">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Faculty Count</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {departments.map((dept, idx) => (
          <tr key={dept._id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{`DEPT-${(idx + 1).toString().padStart(3, '0')}`}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dept.name}</td>
            <td className="px-6 py-4 text-sm text-gray-500">{dept.description}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dept.facultyCount}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
              <button
                onClick={() => onEdit(dept)}
                className="text-blue-600 hover:text-blue-900 cursor-pointer"
              >
                <i className="fas fa-edit"></i>
              </button>
              <button
                onClick={() => onDelete(dept._id)}
                className="text-red-600 hover:text-red-900 cursor-pointer"
              >
                <i className="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DepartmentTable; 