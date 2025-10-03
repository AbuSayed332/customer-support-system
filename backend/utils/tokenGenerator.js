const jwt = require('jsonwebtoken');
const crypto = require('crypto');

/**
 * Generate JWT Token
 * @param {String} id - User ID
 * @returns {String} JWT token
 */
exports.generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

/**
 * Generate JWT Token with custom payload
 * @param {Object} payload - Custom payload data
 * @param {String} expiresIn - Token expiration time
 * @returns {String} JWT token
 */
exports.generateCustomToken = (payload, expiresIn = '7d') => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });
};

/**
 * Verify JWT Token
 * @param {String} token - JWT token to verify
 * @returns {Object} Decoded token payload
 */
exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

/**
 * Decode JWT Token without verification (for inspection)
 * @param {String} token - JWT token
 * @returns {Object} Decoded token
 */
exports.decodeToken = (token) => {
  return jwt.decode(token);
};

/**
 * Generate refresh token
 * @param {String} id - User ID
 * @returns {String} Refresh token
 */
exports.generateRefreshToken = (id) => {
  return jwt.sign({ id, type: 'refresh' }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

/**
 * Generate random token for password reset, email verification, etc.
 * @returns {String} Random token
 */
exports.generateRandomToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

/**
 * Hash token for storage
 * @param {String} token - Token to hash
 * @returns {String} Hashed token
 */
exports.hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

/**
 * Generate password reset token
 * @returns {Object} { token, hashedToken, expiresAt }
 */
exports.generatePasswordResetToken = () => {
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

  return {
    token: resetToken,
    hashedToken,
    expiresAt,
  };
};

/**
 * Generate email verification token
 * @returns {Object} { token, hashedToken, expiresAt }
 */
exports.generateEmailVerificationToken = () => {
  const verificationToken = crypto.randomBytes(32).toString('hex');
  
  const hashedToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');
  
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

  return {
    token: verificationToken,
    hashedToken,
    expiresAt,
  };
};

/**
 * Extract token from request
 * @param {Object} req - Express request object
 * @returns {String|null} Token or null
 */
exports.extractToken = (req) => {
  let token = null;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  return token;
};

/**
 * Get token expiration time
 * @param {String} token - JWT token
 * @returns {Date|null} Expiration date or null
 */
exports.getTokenExpiration = (token) => {
  try {
    const decoded = jwt.decode(token);
    if (decoded && decoded.exp) {
      return new Date(decoded.exp * 1000);
    }
    return null;
  } catch (error) {
    return null;
  }
};

/**
 * Check if token is expired
 * @param {String} token - JWT token
 * @returns {Boolean} True if expired
 */
exports.isTokenExpired = (token) => {
  try {
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.exp) {
      return true;
    }
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
};

/**
 * Generate API key
 * @returns {String} API key
 */
exports.generateApiKey = () => {
  return `sk_${crypto.randomBytes(32).toString('hex')}`;
};