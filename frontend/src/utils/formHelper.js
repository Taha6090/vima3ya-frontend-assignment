export const isFormValid = (values, sections) => {
  for (const section of sections) {
    for (const field of section.fields) {
      if (field.validator) {
        const value = values[field.name];
        
        if (field.validator === 'required' && (!value || (typeof value === 'string' && !value.trim()))) {
          return false;
        }
        
        if (field.validator === 'email' && value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) return false;
        }
        
        if (field.validator === 'phone' && value) {
          const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,5}[-\s\.]?[0-9]{1,5}$/;
          if (!phoneRegex.test(value)) return false;
        }
      }
    }
  }
  return true;
};