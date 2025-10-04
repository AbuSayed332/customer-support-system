/**
 * Validate email format
 * @param {String} email - Email address
 * @returns {Boolean} True if valid
 */
exports.isValidEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number
 * @param {String} phone - Phone number
 * @returns {Boolean} True if valid
 */
exports.isValidPhone = (phone) => {
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone);
};

/**
 * Validate password strength
 * @param {String} password - Password
 * @returns {Object} { valid, strength, message }
 */
exports.validatePasswordStrength = (password) => {
  const result = {
    valid: false,
    strength: 'weak',
    message: '',
  };

  if (!password || password.length < 6) {
    result.message = 'Password must be at least 6 characters long';
    return result;
  }

  let strength = 0;

  // Check length
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;

  // Check for lowercase letters
  if (/[a-z]/.test(password)) strength++;

  // Check for uppercase letters
  if (/[A-Z]/.test(password)) strength++;

  // Check for numbers
  if (/[0-9]/.test(password)) strength++;

  // Check for special characters
  if (/[^a-zA-Z0-9]/.test(password)) strength++;

  if (strength <= 2) {
    result.strength = 'weak';
    result.message = 'Password is weak. Add uppercase, numbers, and special characters.';
  } else if (strength <= 4) {
    result.strength = 'medium';
    result.message = 'Password is medium strength.';
    result.valid = true;
  } else {
    result.strength = 'strong';
    result.message = 'Password is strong.';
    result.valid = true;
  }

  return result;
};

/**
 * Validate MongoDB ObjectId
 * @param {String} id - ID to validate
 * @returns {Boolean} True if valid
 */
exports.isValidObjectId = (id) => {
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  return objectIdRegex.test(id);
};

/**
 * Validate URL format
 * @param {String} url - URL to validate
 * @returns {Boolean} True if valid
 */
exports.isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Sanitize string (remove HTML tags and trim)
 * @param {String} str - String to sanitize
 * @returns {String} Sanitized string
 */
exports.sanitizeString = (str) => {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>/g, '').trim();
};

/**
 * Validate ticket priority
 * @param {String} priority - Priority level
 * @returns {Boolean} True if valid
 */
exports.isValidPriority = (priority) => {
  const validPriorities = ['Low', 'Medium', 'High', 'Urgent'];
  return validPriorities.includes(priority);
};

/**
 * Validate ticket status
 * @param {String} status - Ticket status
 * @returns {Boolean} True if valid
 */
exports.isValidTicketStatus = (status) => {
  const validStatuses = ['Open', 'In Progress', 'Resolved', 'Closed'];
  return validStatuses.includes(status);
};

/**
 * Validate ticket category
 * @param {String} category - Ticket category
 * @returns {Boolean} True if valid
 */
exports.isValidCategory = (category) => {
  const validCategories = [
    'Technical Support',
    'Billing',
    'Account',
    'Feature Request',
    'Bug Report',
    'General Inquiry',
    'Other',
  ];
  return validCategories.includes(category);
};

/**
 * Validate user role
 * @param {String} role - User role
 * @returns {Boolean} True if valid
 */
exports.isValidRole = (role) => {
  const validRoles = ['customer', 'admin'];
  return validRoles.includes(role);
};

/**
 * Validate date format
 * @param {String} dateString - Date string
 * @returns {Boolean} True if valid
 */
exports.isValidDate = (dateString) => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

/**
 * Check if string is empty or whitespace only
 * @param {String} str - String to check
 * @returns {Boolean} True if empty
 */
exports.isEmpty = (str) => {
  return !str || str.trim().length === 0;
};

/**
 * Validate string length
 * @param {String} str - String to validate
 * @param {Number} min - Minimum length
 * @param {Number} max - Maximum length
 * @returns {Object} { valid, message }
 */
exports.validateLength = (str, min, max) => {
  if (!str) {
    return { valid: false, message: 'Value is required' };
  }

  const length = str.trim().length;

  if (length < min) {
    return {
      valid: false,
      message: `Must be at least ${min} characters long`,
    };
  }

  if (length > max) {
    return {
      valid: false,
      message: `Must be no more than ${max} characters long`,
    };
  }

  return { valid: true, message: 'Valid' };
};

/**
 * Validate array of values
 * @param {Array} arr - Array to validate
 * @param {Function} validator - Validator function
 * @returns {Object} { valid, errors }
 */
exports.validateArray = (arr, validator) => {
  if (!Array.isArray(arr)) {
    return { valid: false, errors: ['Not an array'] };
  }

  const errors = [];
  arr.forEach((item, index) => {
    if (!validator(item)) {
      errors.push(`Invalid value at index ${index}`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Remove special characters
 * @param {String} str - String to clean
 * @returns {String} Cleaned string
 */
exports.removeSpecialCharacters = (str) => {
  return str.replace(/[^a-zA-Z0-9 ]/g, '');
};

/**
 * Normalize whitespace
 * @param {String} str - String to normalize
 * @returns {String} Normalized string
 */
exports.normalizeWhitespace = (str) => {
  return str.replace(/\s+/g, ' ').trim();
};

/**
 * Validate credit card number (basic Luhn algorithm)
 * @param {String} cardNumber - Card number
 * @returns {Boolean} True if valid
 */
exports.isValidCreditCard = (cardNumber) => {
  const cleaned = cardNumber.replace(/\s/g, '');
  
  if (!/^\d+$/.test(cleaned)) {
    return false;
  }

  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

/**
 * Escape HTML special characters
 * @param {String} str - String to escape
 * @returns {String} Escaped string
 */
exports.escapeHtml = (str) => {
  const htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };

  return str.replace(/[&<>"'/]/g, (char) => htmlEscapes[char]);
};

/**
 * Validate pagination parameters
 * @param {Number} page - Page number
 * @param {Number} limit - Items per page
 * @returns {Object} { valid, page, limit, message }
 */
exports.validatePagination = (page, limit) => {
  const validPage = parseInt(page, 10) || 1;
  const validLimit = parseInt(limit, 10) || 10;

  if (validPage < 1) {
    return {
      valid: false,
      page: 1,
      limit: validLimit,
      message: 'Page must be greater than 0',
    };
  }

  if (validLimit < 1 || validLimit > 100) {
    return {
      valid: false,
      page: validPage,
      limit: 10,
      message: 'Limit must be between 1 and 100',
    };
  }

  return {
    valid: true,
    page: validPage,
    limit: validLimit,
    message: 'Valid pagination',
  };
};

/**
 * Check if value is numeric
 * @param {*} value - Value to check
 * @returns {Boolean} True if numeric
 */
exports.isNumeric = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};