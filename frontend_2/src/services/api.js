const API_BASE_URL = 'http://localhost:5000/api';

// Department API calls
export const departmentAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/departments`);
    if (!response.ok) throw new Error('Failed to fetch departments');
    return response.json();
  },

  create: async (department) => {
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

  update: async (id, department) => {
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

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/departments/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete department');
    return response.json();
  },
};

// Faculty API calls
export const facultyAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/faculty`);
    if (!response.ok) throw new Error('Failed to fetch faculty');
    return response.json();
  },

  create: async (faculty) => {
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

  update: async (id, faculty) => {
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

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/faculty/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete faculty member');
    return response.json();
  },
}; 