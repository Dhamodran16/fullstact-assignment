const API_BASE_URL = 'http://localhost:5000/api';

// Types
export interface Department {
  _id: string;
  name: string;
  description: string;
  facultyCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Faculty {
  _id: string;
  name: string;
  department: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
  updatedAt: string;
}

// Department API calls
export const departmentAPI = {
  getAll: async (): Promise<Department[]> => {
    const response = await fetch(`${API_BASE_URL}/departments`);
    if (!response.ok) throw new Error('Failed to fetch departments');
    return response.json();
  },

  create: async (department: { name: string; description: string }): Promise<Department> => {
    const response = await fetch(`${API_BASE_URL}/departments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(department),
    });
    if (!response.ok) throw new Error('Failed to create department');
    return response.json();
  },

  update: async (id: string, department: { name: string; description: string }): Promise<Department> => {
    const response = await fetch(`${API_BASE_URL}/departments/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(department),
    });
    if (!response.ok) throw new Error('Failed to update department');
    return response.json();
  },

  delete: async (id: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/departments/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete department');
    return response.json();
  },
};

// Faculty API calls
export const facultyAPI = {
  getAll: async (): Promise<Faculty[]> => {
    const response = await fetch(`${API_BASE_URL}/faculty`);
    if (!response.ok) throw new Error('Failed to fetch faculty');
    return response.json();
  },

  create: async (faculty: { name: string; department: string; email: string; phone: string; status: string }): Promise<Faculty> => {
    const response = await fetch(`${API_BASE_URL}/faculty`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(faculty),
    });
    if (!response.ok) throw new Error('Failed to create faculty member');
    return response.json();
  },

  update: async (id: string, faculty: { name: string; department: string; email: string; phone: string; status: string }): Promise<Faculty> => {
    const response = await fetch(`${API_BASE_URL}/faculty/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(faculty),
    });
    if (!response.ok) throw new Error('Failed to update faculty member');
    return response.json();
  },

  delete: async (id: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/faculty/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete faculty member');
    return response.json();
  },
}; 