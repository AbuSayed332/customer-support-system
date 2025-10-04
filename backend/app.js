const express = require('express');
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
const allowedOrigins = ['http://localhost:5173'];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
};

app.use(cors(corsOptions));

// Rate Limiting - Prevent abuse
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW) * 60 * 1000 || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to all API routes
app.use('/api/', limiter);

// Strict rate limiting for authentication routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts, please try again after 15 minutes.',
  skipSuccessfulRequests: true,
});

app.use('/api/v1/auth/login', authLimiter);
app.use('/api/v1/auth/register', authLimiter);

// ============================================================================
// BODY PARSING MIDDLEWARE
// ============================================================================

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// ============================================================================
// LOGGING MIDDLEWARE
// ============================================================================

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// ============================================================================
// STATIC FILES
// ============================================================================

app.use('/uploads', express.static('uploads'));

// ============================================================================
// API ROUTES
// ============================================================================

const routes = require('./routes');
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

app.use(notFound);
app.use(errorHandler);

// ============================================================================
// EXPORT APP
// ============================================================================

module.exports = app;
