require('dotenv').config();
const http = require('http');
const app = require('./app');
const connectDB = require('./config/database');
const { initializeSocket } = require('./socket/socketHandler');

// ============================================================================
// ENVIRONMENT VARIABLES VALIDATION
// ============================================================================

const requiredEnvVars = [
  'NODE_ENV',
  'PORT',
  'MONGODB_URI',
  'JWT_SECRET',
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error(' Missing required environment variables:');
  missingEnvVars.forEach(envVar => {
    console.error(`   - ${envVar}`);
  });
  process.exit(1);
}

// ============================================================================
// SERVER CONFIGURATION
// ============================================================================

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ============================================================================
// DATABASE CONNECTION
// ============================================================================

connectDB();

// ============================================================================
// CREATE HTTP SERVER
// ============================================================================

const server = http.createServer(app);

// ============================================================================
// INITIALIZE SOCKET.IO
// ============================================================================

const io = initializeSocket(server);

// Make io accessible to routes
app.set('io', io);

// ============================================================================
// START SERVER
// ============================================================================

server.listen(PORT, () => {
  console.log('');
  console.log(' Server Configuration');
  console.log('');
  console.log(`   Environment: ${NODE_ENV}`);
  console.log(`   Port: ${PORT}`);
  console.log(`   API URL: http://localhost:${PORT}/api/v1`);
  console.log(`   Health Check: http://localhost:${PORT}/api/v1/health`);
  console.log(`   Socket.IO: Initialized`);
  console.log('');
});

// ============================================================================
// GRACEFUL SHUTDOWN
// ============================================================================

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(' Unhandled Promise Rejection:', err.message);
  console.error(err.stack);
  
  // Close server & exit process
  server.close(() => {
    console.log(' Server closed due to unhandled rejection');
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error(' Uncaught Exception:', err.message);
  console.error(err.stack);
  
  // Close server & exit process
  server.close(() => {
    console.log(' Server closed due to uncaught exception');
    process.exit(1);
  });
});

app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : {},
  });
});

// Handle SIGTERM
process.on('SIGTERM', () => {
  console.log(' SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log(' HTTP server closed');
    process.exit(0);
  });
});

// Handle SIGINT (Ctrl+C)
process.on('SIGINT', () => {
  console.log('\n SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log(' HTTP server closed');
    process.exit(0);
  });
});

// ============================================================================
// EXPORT SERVER (for testing purposes)
// ============================================================================

module.exports = server;
