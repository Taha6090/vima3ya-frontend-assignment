export const SECTIONS = [
  {
    id: 'section-a',
    title: 'Section A — Personal Info',
    fields: [
      {
        name: 'fullName',
        label: 'Full Name',
        type: 'text',
        placeholder: 'Enter your full name',
        validator: 'required',
        errorMessage: 'Full name is required'
      },
      {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        placeholder: 'you@example.com',
        validator: 'email',
        errorMessage: 'Please enter a valid email address'
      },
      {
        name: 'phone',
        label: 'Phone Number',
        type: 'tel',
        placeholder: '+1 234 567 8900',
        validator: 'phone',
        errorMessage: 'Please enter a valid phone number'
      }
    ]
  },
  {
    id: 'section-b',
    title: 'Section B — Address Details',
    fields: [
      {
        name: 'address',
        label: 'Street Address',
        type: 'text',
        placeholder: '123 Main Street',
        validator: 'required',
        errorMessage: 'Street address is required'
      },
      {
        name: 'city',
        label: 'City',
        type: 'text',
        placeholder: 'New York',
        validator: 'required',
        errorMessage: 'City is required'
      },
      {
        name: 'zipCode',
        label: 'Zip Code',
        type: 'text',
        placeholder: '10001',
        validator: 'required',
        errorMessage: 'Zip code is required'
      }
    ]
  },
  {
    id: 'section-c',
    title: 'Section C — Preferences',
    fields: [
      {
        name: 'preferredLanguage',
        label: 'Preferred Language',
        type: 'select',
        placeholder: 'Select language',
        validator: 'required',
        errorMessage: 'Please select a language',
        options: ['English', 'Spanish', 'French', 'German', 'Chinese']
      },
      {
        name: 'newsletter',
        label: 'Subscribe to Newsletter',
        type: 'checkbox',
        placeholder: '',
        validator: null
      },
      {
        name: 'feedback',
        label: 'Additional Comments',
        type: 'textarea',
        placeholder: 'Any additional comments...',
        validator: null
      }
    ]
  },
  {
    id: 'section-d',
    title: 'Section D — Additional Info',
    fields: [
      {
        name: 'company',
        label: 'Company Name',
        type: 'text',
        placeholder: 'Your company',
        validator: 'required',
        errorMessage: 'Company name is required'
      },
      {
        name: 'position',
        label: 'Position',
        type: 'text',
        placeholder: 'Your position',
        validator: 'required',
        errorMessage: 'Position is required'
      },
      {
        name: 'yearsExperience',
        label: 'Years of Experience',
        type: 'number',
        placeholder: 'Years',
        validator: 'required',
        errorMessage: 'Years of experience is required'
      }
    ]
  }
];

export const INITIAL_VALUES = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  zipCode: '',
  preferredLanguage: '',
  newsletter: false,
  feedback: '',
  company: '',
  position: '',
  yearsExperience: ''
};