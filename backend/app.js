<<<<<<< HEAD
﻿const express = require('express');
=======
const express = require('express');
>>>>>>> 74020d9ba49482918bfee0022530c45616d68dc8
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const { errorHandler, notFound } = require('./middleware/errorHandler');

// Initialize express app
const app = express();

// ============================================================================
// IGNORE FAVICON REQUESTS
// ============================================================================
app.get('/favicon.ico', (req, res) => res.status(204).send());

// ============================================================================
// SECURITY MIDDLEWARE
// ============================================================================

// Helmet - Set security HTTP headers
app.use(helmet());

// CORS - Enable Cross-Origin Resource Sharing
<<<<<<< HEAD
const allowedOrigins = ['http://localhost:5173'];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
=======
// const corsOptions = {
//   origin: process.env.CLIENT_URL || 'http://localhost:5173',

//   credentials: true,
//   optionsSuccessStatus: 200,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
// };
const allowedOrigins = ['http://localhost:5173'];

const corsOptions = {
  // The origin property can be a string, regex, or a function.
  // Here, we use a function for more robust checking.
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

>>>>>>> 74020d9ba49482918bfee0022530c45616d68dc8
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
<<<<<<< HEAD
=======
  // This is crucial for requests that include cookies or authorization headers.
>>>>>>> 74020d9ba49482918bfee0022530c45616d68dc8
  credentials: true,
};

app.use(cors(corsOptions));

// Rate Limiting - Prevent abuse
const limiter = rateLimit({
<<<<<<< HEAD
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW) * 60 * 1000 || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
=======
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW) * 60 * 1000 || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // Limit each IP to 100 requests per windowMs
>>>>>>> 74020d9ba49482918bfee0022530c45616d68dc8
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to all API routes
app.use('/api/', limiter);

// Strict rate limiting for authentication routes
const authLimiter = rateLimit({
<<<<<<< HEAD
  windowMs: 15 * 60 * 1000,
  max: 5,
=======
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per windowMs
>>>>>>> 74020d9ba49482918bfee0022530c45616d68dc8
  message: 'Too many login attempts, please try again after 15 minutes.',
  skipSuccessfulRequests: true,
});

app.use('/api/v1/auth/login', authLimiter);
app.use('/api/v1/auth/register', authLimiter);

// ============================================================================
// BODY PARSING MIDDLEWARE
// ============================================================================

<<<<<<< HEAD
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
=======
// Body parser - Parse JSON and URL-encoded data
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie parser
>>>>>>> 74020d9ba49482918bfee0022530c45616d68dc8
app.use(cookieParser());

// ============================================================================
// LOGGING MIDDLEWARE
// ============================================================================

<<<<<<< HEAD
=======
// Morgan - HTTP request logger
>>>>>>> 74020d9ba49482918bfee0022530c45616d68dc8
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// ============================================================================
// STATIC FILES
// ============================================================================

<<<<<<< HEAD
=======
// Serve uploaded files
>>>>>>> 74020d9ba49482918bfee0022530c45616d68dc8
app.use('/uploads', express.static('uploads'));

// ============================================================================
// API ROUTES
// ============================================================================

<<<<<<< HEAD
const routes = require('./routes');
=======
// Import routes
const routes = require('./routes');

// Mount API routes
>>>>>>> 74020d9ba49482918bfee0022530c45616d68dc8
app.use('/api/v1', routes);

// ============================================================================
// ROOT ROUTE
// ============================================================================

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Customer Support Ticketing System API',
    version: '1.0.0',
    documentation: '/api/v1',
    health: '/api/v1/health',
  });
});

// ============================================================================
// ERROR HANDLING
// ============================================================================

<<<<<<< HEAD
app.use(notFound);
=======
// 404 handler - Route not found
app.use(notFound);

// Global error handler
>>>>>>> 74020d9ba49482918bfee0022530c45616d68dc8
app.use(errorHandler);

// ============================================================================
// EXPORT APP
// ============================================================================

<<<<<<< HEAD
module.exports = app;
=======
module.exports = app;
>>>>>>> 74020d9ba49482918bfee0022530c45616d68dc8
