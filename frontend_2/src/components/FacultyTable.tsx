import React from 'react';
import type { Faculty } from '../services/api';

type FacultyTableProps = {
  faculty: Faculty[];
  onEdit: (fac: Faculty) => void;
  onDelete: (id: string) => void;
};

const FacultyTable: React.FC<FacultyTableProps> = ({ faculty, onEdit, onDelete }) => (
  <div className="bg-white shadow-sm rounded-lg overflow-hidden">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {faculty.map((fac) => (
          <tr key={fac._id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fac._id}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{fac.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fac.department}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fac.email}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fac.phone}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                fac.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {fac.status}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
              <button
                onClick={() => onEdit(fac)}
                className="text-blue-600 hover:text-blue-900 cursor-pointer"
              >
                <i className="fas fa-edit"></i>
              </button>
              <button
                onClick={() => onDelete(fac._id)}
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

export default FacultyTable; 