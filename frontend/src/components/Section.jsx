import React, { forwardRef } from 'react';
import FormField from './FormFields';

const Section = forwardRef(({ section, values, handleChange, handleBlur }, ref) => {
  return (
    <div 
      id={section.id} 
      ref={ref} 
      className="bg-white rounded-2xl p-8 mb-6 shadow-lg transition-transform hover:-translate-y-1 animate-slide-in"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-4 border-purple-500 inline-block">
        {section.title}
      </h2>
      {section.fields.map((field) => (
        <FormField
          key={field.name}
          name={field.name}
          value={values[field.name]}
          placeholder={field.placeholder}
          validator={field.validator}
          errorMessage={field.errorMessage}
          type={field.type}
          label={field.label}
          options={field.options || []}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      ))}
    </div>
  );
});

Section.displayName = 'Section';

export default Section;