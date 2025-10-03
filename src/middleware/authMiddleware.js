
const jwt = require('jsonwebtoken');
const { asyncHandler } = require('./errorHandler');
const User = require('../models/User');

// @desc    Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.cookies.token) {
    token = req.cookies.token;
  }
  // Uncomment the following lines if you also want to support Bearer tokens in headers
  // else if (
  //   req.headers.authorization &&
  //   req.headers.authorization.startsWith('Bearer')
  // ) {
  //   token = req.headers.authorization.split(' ')[1];
  // }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized to access this route');
  }

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded.id);

  next();
});
