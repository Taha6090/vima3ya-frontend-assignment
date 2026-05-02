export const validators = {
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return 'This field is required';
    if (!emailRegex.test(value)) return 'Invalid email format';
    return null;
  },
  
  phone: (value) => {
    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,5}[-\s\.]?[0-9]{1,5}$/;
    if (!value) return 'This field is required';
    if (!phoneRegex.test(value)) return 'Invalid phone number format';
    return null;
  },
  
  required: (value) => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return 'This field is required';
    }
    if (typeof value === 'boolean' && !value) {
      return null;
    }
    return null;
  }
};

export const validateField = (validatorType, value, customMessage) => {
  if (validatorType && validators[validatorType]) {
    const error = validators[validatorType](value);
    if (error && customMessage) {
      return customMessage;
    }
    return error;
  }
  
  if (!value || (typeof value === 'string' && !value.trim())) {
    return customMessage || 'This field is required';
  }
  
  return null;
};