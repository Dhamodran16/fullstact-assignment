export interface ValidationError {
  field: string;
  message: string;
}

export interface DepartmentFormData {
  name: string;
  description: string;
}

export interface FacultyFormData {
  name: string;
  department: string;
  email: string;
  phone: string;
  status: string;
}

export const validateDepartment = (data: DepartmentFormData): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Name validation
  if (!data.name.trim()) {
    errors.push({ field: 'name', message: 'Department name is required' });
  } else if (data.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Department name must be at least 2 characters long' });
  } else if (data.name.trim().length > 50) {
    errors.push({ field: 'name', message: 'Department name must be less than 50 characters' });
  }

  // Description validation
  if (!data.description.trim()) {
    errors.push({ field: 'description', message: 'Description is required' });
  } else if (data.description.trim().length < 10) {
    errors.push({ field: 'description', message: 'Description must be at least 10 characters long' });
  } else if (data.description.trim().length > 500) {
    errors.push({ field: 'description', message: 'Description must be less than 500 characters' });
  }

  return errors;
};

export const validateFaculty = (data: FacultyFormData): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Name validation
  if (!data.name.trim()) {
    errors.push({ field: 'name', message: 'Full name is required' });
  } else if (data.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters long' });
  } else if (data.name.trim().length > 100) {
    errors.push({ field: 'name', message: 'Name must be less than 100 characters' });
  }

  // Department validation
  if (!data.department.trim()) {
    errors.push({ field: 'department', message: 'Department is required' });
  }

  // Email validation
  if (!data.email.trim()) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      errors.push({ field: 'email', message: 'Please enter a valid email address' });
    }
  }

  // Phone validation
  if (!data.phone.trim()) {
    errors.push({ field: 'phone', message: 'Phone number is required' });
  } else {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = data.phone.replace(/[\s\-\(\)]/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      errors.push({ field: 'phone', message: 'Please enter a valid phone number' });
    }
  }

  // Status validation
  if (!data.status) {
    errors.push({ field: 'status', message: 'Status is required' });
  }

  return errors;
};

export const getFieldError = (errors: ValidationError[], field: string): string | null => {
  const error = errors.find(err => err.field === field);
  return error ? error.message : null;
}; 