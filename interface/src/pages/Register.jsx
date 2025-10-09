// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { UserPlus } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
// import Input from '../components/common/Input';
// import Button from '../components/common/Button';
// import Alert from '../components/common/Alert';

// const Register = () => {
//   const navigate = useNavigate();
//   const { register } = useAuth();
  
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [apiError, setApiError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: '' });
//     }
//   };

//   const validate = () => {
//     const newErrors = {};
    
//     if (!formData.name) {
//       newErrors.name = 'Name is required';
//     }
    
//     if (!formData.email) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }
    
//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }
    
//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = 'Please confirm your password';
//     } else if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }
    
//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newErrors = validate();
    
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     setLoading(true);
//     setApiError('');

//     try {
//       const { confirmPassword, ...registerData } = formData;
//       await register(registerData);
//       navigate('/dashboard');
//     } catch (error) {
//       setApiError(error.response?.data?.message || 'Registration failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-xl p-8">
//       <div className="text-center mb-8">
//         <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
//           <UserPlus className="w-8 h-8 text-primary-600" />
//         </div>
//         <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
//         <p className="text-gray-600 mt-2">Sign up to get started</p>
//       </div>

//       {apiError && (
//         <Alert type="error" message={apiError} className="mb-6" />
//       )}

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <Input
//           label="Full Name"
//           name="name"
//           type="text"
//           value={formData.name}
//           onChange={handleChange}
//           error={errors.name}
//           placeholder="John Doe"
//           required
//         />

//         <Input
//           label="Email Address"
//           name="email"
//           type="email"
//           value={formData.email}
//           onChange={handleChange}
//           error={errors.email}
//           placeholder="you@example.com"
//           required
//         />

//         <Input
//           label="Password"
//           name="password"
//           type="password"
//           value={formData.password}
//           onChange={handleChange}
//           error={errors.password}
//           placeholder="••••••••"
//           required
//         />

//         <Input
//           label="Confirm Password"
//           name="confirmPassword"
//           type="password"
//           value={formData.confirmPassword}
//           onChange={handleChange}
//           error={errors.confirmPassword}
//           placeholder="••••••••"
//           required
//         />

//         <Button type="submit" fullWidth loading={loading}>
//           Create Account
//         </Button>
//       </form>

//       <p className="mt-6 text-center text-sm text-gray-600">
//         Already have an account?{' '}
//         <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
//           Sign in
//         </Link>
//       </p>
//     </div>
//   );
// };

// export default Register;


// ============================================================================
// FILE: src/pages/Register.jsx
// Role-Based Registration Page
// ============================================================================

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, User, Shield, Users, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Alert from '../components/common/Alert';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [step, setStep] = useState(1); // Step 1: Role selection, Step 2: Form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    phone: '',
    organization: '', // Optional for agents/admins
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  // Role options
  const roles = [
    { 
      value: 'customer', 
      label: 'Customer', 
      icon: User,
      description: 'Get support for your issues',
      features: [
        'Submit support tickets',
        'Track ticket status',
        'Real-time chat support',
        'Access ticket history'
      ],
      color: 'blue'
    },
    { 
      value: 'agent', 
      label: 'Support Agent', 
      icon: Users,
      description: 'Help customers resolve issues',
      features: [
        'Manage assigned tickets',
        'Respond to customers',
        'Update ticket status',
        'Internal notes & collaboration'
      ],
      color: 'green'
    },
    { 
      value: 'admin', 
      label: 'Administrator', 
      icon: Shield,
      description: 'Manage the entire system',
      features: [
        'Full system access',
        'User management',
        'Analytics & reports',
        'System configuration'
      ],
      color: 'purple'
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleRoleSelect = (roleValue) => {
    setFormData({ ...formData, role: roleValue });
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
    setApiError('');
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }

    // Optional validations for agents/admins
    if ((formData.role === 'agent' || formData.role === 'admin') && formData.organization && formData.organization.length < 2) {
      newErrors.organization = 'Organization name must be at least 2 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setApiError('');

    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
      navigate('/dashboard');
    } catch (error) {
      setApiError(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getColorClasses = (color, isSelected) => {
    const colors = {
      blue: isSelected 
        ? 'border-blue-500 bg-blue-50 shadow-md' 
        : 'border-gray-200 hover:border-blue-300 hover:shadow-md',
      green: isSelected 
        ? 'border-green-500 bg-green-50 shadow-md' 
        : 'border-gray-200 hover:border-green-300 hover:shadow-md',
      purple: isSelected 
        ? 'border-purple-500 bg-purple-50 shadow-md' 
        : 'border-gray-200 hover:border-purple-300 hover:shadow-md',
    };
    return colors[color];
  };

  const getIconColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
    };
    return colors[color];
  };

  const selectedRole = roles.find(r => r.value === formData.role);

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <UserPlus className="w-8 h-8 text-primary-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
        <p className="text-gray-600 mt-2">
          {step === 1 ? 'Choose your account type' : 'Complete your registration'}
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
            1
          </div>
          <div className={`w-16 h-1 ${step >= 2 ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
            2
          </div>
        </div>
      </div>

      {apiError && (
        <Alert type="error" message={apiError} className="mb-6" />
      )}

      {/* Step 1: Role Selection */}
      {step === 1 && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roles.map((role) => {
              const Icon = role.icon;
              
              return (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => handleRoleSelect(role.value)}
                  className={`p-6 border-2 rounded-lg transition-all text-left ${getColorClasses(role.color, false)}`}
                >
                  <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-4 ${getIconColorClasses(role.color)}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">
                    {role.label}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {role.description}
                  </p>
                  <ul className="space-y-2">
                    {role.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-xs text-gray-600">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      )}

      {/* Step 2: Registration Form */}
      {step === 2 && selectedRole && (
        <div>
          <div className="mb-6 p-4 bg-gray-50 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${getIconColorClasses(selectedRole.color)}`}>
                <selectedRole.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Registering as</p>
                <p className="font-semibold text-gray-900">{selectedRole.label}</p>
              </div>
            </div>
            <Button variant="ghost" onClick={handleBack} size="small">
              Change
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="John Doe"
                required
              />

              <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                placeholder="••••••••"
                required
              />

              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Phone Number (Optional)"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                placeholder="+1 (555) 000-0000"
              />

              {(formData.role === 'agent' || formData.role === 'admin') && (
                <Input
                  label="Organization (Optional)"
                  name="organization"
                  type="text"
                  value={formData.organization}
                  onChange={handleChange}
                  error={errors.organization}
                  placeholder="Your Company Name"
                />
              )}
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                required
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 mt-1"
              />
              <label className="ml-2 text-sm text-gray-600">
                I agree to the{' '}
                <Link to="/terms" className="text-primary-600 hover:text-primary-700">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary-600 hover:text-primary-700">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <div className="flex space-x-4">
              <Button type="button" variant="secondary" onClick={handleBack} fullWidth>
                Back
              </Button>
              <Button type="submit" loading={loading} fullWidth>
                Create Account
              </Button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Register;