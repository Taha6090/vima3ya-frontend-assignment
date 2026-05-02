import React from 'react';
import { Field, ErrorMessage } from 'formik';

const FormField = ({ name, value, placeholder, validator, errorMessage, type = 'text', label, options = [] }) => {
  const renderInput = () => {
    const baseClasses = "w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300";
    const errorClasses = "border-red-400 focus:border-red-500 focus:ring-red-200";
    const normalClasses = "border-gray-200 focus:border-gray-900 focus:ring-gray-200";
    
    const inputClasses = `${baseClasses} ${normalClasses}`;
    
    switch (type) {
      case 'textarea':
        return (
          <Field
            as="textarea"
            id={name}
            name={name}
            placeholder={placeholder}
            rows="4"
            className={inputClasses}
          />
        );
      case 'select':
        return (
          <Field
            as="select"
            id={name}
            name={name}
            className={`${baseClasses} ${normalClasses} bg-white`}
          >
            <option value="">{placeholder || 'Select an option'}</option>
            {options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </Field>
        );
      case 'checkbox':
        return (
          <div className="flex items-center gap-3">
            <Field
              type="checkbox"
              id={name}
              name={name}
              className="w-5 h-5 text-purple-600 border-2 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
            />
            <label htmlFor={name} className="text-gray-700 cursor-pointer">
              {label}
            </label>
          </div>
        );
      default:
        return (
          <Field
            type={type}
            id={name}
            name={name}
            placeholder={placeholder}
            className={inputClasses}
          />
        );
    }
  };

  return (
    <div className="mb-6">
      {label && type !== 'checkbox' && (
        <label htmlFor={name} className="block mb-2 text-gray-700 font-medium">
          {label}
          {validator && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {renderInput()}
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
    </div>
  );
};

export default FormField;