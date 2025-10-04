export const validateEmail = (email) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

export const validateLength = (value, min, max) => {
  if (!value) return false;
  const length = value.trim().length;
  return length >= min && length <= max;
};

export const validateFileSize = (file, maxSize = MAX_FILE_SIZE) => {
  return file.size <= maxSize;
};

export const validateFileType = (file, allowedTypes = ALLOWED_FILE_TYPES) => {
  return allowedTypes.includes(file.type);
};

export const getValidationErrors = (formData, rules) => {
  const errors = {};

  Object.keys(rules).forEach((field) => {
    const rule = rules[field];
    const value = formData[field];

    if (rule.required && !validateRequired(value)) {
      errors[field] = rule.requiredMessage || `${field} is required`;
    } else if (rule.email && !validateEmail(value)) {
      errors[field] = rule.emailMessage || 'Invalid email format';
    } else if (rule.minLength && value && value.length < rule.minLength) {
      errors[field] = rule.minLengthMessage || `Minimum ${rule.minLength} characters required`;
    } else if (rule.maxLength && value && value.length > rule.maxLength) {
      errors[field] = rule.maxLengthMessage || `Maximum ${rule.maxLength} characters allowed`;
    }
  });

  return errors;
};