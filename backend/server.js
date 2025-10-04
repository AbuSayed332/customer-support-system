<<<<<<< HEAD
﻿require('dotenv').config();
=======
require('dotenv').config();
>>>>>>> 74020d9ba49482918bfee0022530c45616d68dc8
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
<<<<<<< HEAD
  console.error(' Missing required environment variables:');
=======
  console.error('❌ Missing required environment variables:');
>>>>>>> 74020d9ba49482918bfee0022530c45616d68dc8
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
<<<<<<< HEAD
  console.log('');
  console.log(' Server Configuration');
  console.log('');
=======
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🚀 Server Configuration');
  console.log('═══════════════════════════════════════════════════════════');
>>>>>>> 74020d9ba49482918bfee0022530c45616d68dc8
  console.log(`   Environment: ${NODE_ENV}`);
  console.log(`   Port: ${PORT}`);
  console.log(`   API URL: http://localhost:${PORT}/api/v1`);
  console.log(`   Health Check: http://localhost:${PORT}/api/v1/health`);
  console.log(`   Socket.IO: Initialized`);
<<<<<<< HEAD
  console.log('');
=======
  console.log('═══════════════════════════════════════════════════════════');
>>>>>>> 74020d9ba49482918bfee0022530c45616d68dc8
});

// ============================================================================
// GRACEFUL SHUTDOWN
// ============================================================================

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
<<<<<<< HEAD
  console.error(' Unhandled Promise Rejection:', err.message);
=======
  console.error('❌ Unhandled Promise Rejection:', err.message);
>>>>>>> 74020d9ba49482918bfee0022530c45616d68dc8
  console.error(err.stack);
  
  // Close server & exit process
  server.close(() => {
<<<<<<< HEAD
    console.log(' Server closed due to unhandled rejection');
=======
    console.log('🛑 Server closed due to unhandled rejection');
>>>>>>> 74020d9ba49482918bfee0022530c45616d68dc8
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
<<<<<<< HEAD
  console.error(' Uncaught Exception:', err.message);
=======
  console.error('❌ Uncaught Exception:', err.message);
>>>>>>> 74020d9ba49482918bfee0022530c45616d68dc8
  console.error(err.stack);
  
  // Close server & exit process
  server.close(() => {
<<<<<<< HEAD
    console.log(' Server closed due to uncaught exception');
=======
    console.log('🛑 Server closed due to uncaught exception');
>>>>>>> 74020d9ba49482918bfee0022530c45616d68dc8
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
<<<<<<< HEAD
  console.log(' SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log(' HTTP server closed');
=======
  console.log('👋 SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('🛑 HTTP server closed');
>>>>>>> 74020d9ba49482918bfee0022530c45616d68dc8
    process.exit(0);
  });
});

// Handle SIGINT (Ctrl+C)
process.on('SIGINT', () => {
<<<<<<< HEAD
  console.log('\n SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log(' HTTP server closed');
=======
  console.log('\n👋 SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('🛑 HTTP server closed');
>>>>>>> 74020d9ba49482918bfee0022530c45616d68dc8
    process.exit(0);
  });
});

// ============================================================================
// EXPORT SERVER (for testing purposes)
// ============================================================================

module.exports = server;
<<<<<<< HEAD
=======

>>>>>>> 74020d9ba49482918bfee0022530c45616d68dc8
