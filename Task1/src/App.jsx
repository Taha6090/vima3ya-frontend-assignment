import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
// import Sidebar from './components/Sidebar';
import Section from './components/Section';
import ShimmerLoader from './components/ShimmerLoader';
// import useScrollHighlight from './hooks/useScrollHighlight';
// import { SECTIONS, INITIAL_VALUES } from './constants/formConfig';
// import { isFormValid } from './utils/formHelpers';
import Sidebar from './components/Sidbar';
import useScrollHighlight from './hooks/useScorllHighlight';
import { SECTIONS, INITIAL_VALUES } from './constants/fomConfig';
import { isFormValid } from './utils/formHelper';

const App = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const mainContentRef = useRef(null);
  const sectionRefs = useRef({});
  const { highlightedSections, updateHighlightedSections } = useScrollHighlight(SECTIONS, mainContentRef);

  const createValidationSchema = () => {
    const schemaFields = {};

    SECTIONS.forEach(section => {
      section.fields.forEach(field => {
        if (field.validator) {
          switch (field.validator) {
            case 'email':
              schemaFields[field.name] = Yup.string()
                .email(field.errorMessage || 'Invalid email format')
                .required(field.errorMessage || 'Email is required');
              break;
            case 'phone':
              schemaFields[field.name] = Yup.string()
                .matches(/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,5}[-\s\.]?[0-9]{1,5}$/, field.errorMessage || 'Invalid phone number')
                .required(field.errorMessage || 'Phone number is required');
              break;
            case 'required':
              schemaFields[field.name] = Yup.string()
                .required(field.errorMessage || 'This field is required');
              break;
            default:
              schemaFields[field.name] = Yup.string();
          }
        } else {
          schemaFields[field.name] = Yup.string();
        }
      });
    });

    return Yup.object(schemaFields);
  };

  const validationSchema = createValidationSchema();

  const onFormComplete = useCallback(() => {
    console.log('Form is complete and valid!');
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
    }, 3000);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element && mainContentRef.current) {
      const offset = 20;
      const elementPosition = element.offsetTop;
      mainContentRef.current.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  const handleSubmit = (values, { setSubmitting, validateForm }) => {
    setFormSubmitted(true);
    validateForm(values).then(errors => {
      if (Object.keys(errors).length === 0) {
        console.log('Form submitted successfully:', values);
        onFormComplete();
      }
      setSubmitting(false);
    });
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar
        sections={SECTIONS}
        highlightedSections={highlightedSections}
        onNavClick={scrollToSection}
      />

      <div className="flex-1 ml-72 p-8 overflow-y-auto h-screen" ref={mainContentRef}>
      
       <h2 className='text-center text-4xl font-medium'>   Multi-Section Form</h2>

        <div className="max-w-4xl mx-auto">
          <Formik
            initialValues={INITIAL_VALUES}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnChange={formSubmitted}
            validateOnBlur={formSubmitted}
          >
            {({ values, isSubmitting, validateForm }) => {
              useEffect(() => {
                const checkFormValidity = async () => {
                  const errors = await validateForm(values);
                  const isValid = Object.keys(errors).length === 0;

                  if (isValid && isFormValid(values, SECTIONS)) {
                    onFormComplete();
                  }
                };

                checkFormValidity();
              }, [values, validateForm, onFormComplete]);

              return (
                <Form>
                  {SECTIONS.map((section) => (
                    <Section
                      key={section.id}
                      ref={el => sectionRefs.current[section.id] = el}
                      section={section}
                      values={values}
                    />
                  ))}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`relative flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300
    ${isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gray-600 hover:bg-gray-900 active:scale-95 shadow-md hover:shadow-lg'}
  `}
                  >
                    {isSubmitting && (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    )}

                    {isSubmitting ? 'Submitting...' : 'Submit Form'}
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>

      {showLoader && <ShimmerLoader />}
    </div>
  );
};

export default App;