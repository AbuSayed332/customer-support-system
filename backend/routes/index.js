const express = require('express');
const router = express.Router();

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    uptime: process.uptime(),
  });
});

// API documentation route
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Customer Support Ticketing System API',
    version: '1.0.0',
    endpoints: {
      health: '/api/v1/health',
      auth: '/api/v1/auth (coming soon)',
      tickets: '/api/v1/tickets (coming soon)',
      comments: '/api/v1/comments (coming soon)',
      chat: '/api/v1/chat (coming soon)',
      users: '/api/v1/users (coming soon)',
    },
    status: 'Backend server is running. Additional routes will be added soon.'
  });
});

// Temporary placeholder routes (will be replaced with actual routes later)
router.get('/auth', (req, res) => {
  res.status(200).json({ message: 'Auth routes - coming soon' });
});

router.get('/tickets', (req, res) => {
  res.status(200).json({ message: 'Ticket routes - coming soon' });
});

router.get('/comments', (req, res) => {
  res.status(200).json({ message: 'Comment routes - coming soon' });
});

router.get('/chat', (req, res) => {
  res.status(200).json({ message: 'Chat routes - coming soon' });
});

router.get('/users', (req, res) => {
  res.status(200).json({ message: 'User routes - coming soon' });
});

module.exports = router;
