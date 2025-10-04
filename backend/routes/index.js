<<<<<<< HEAD
﻿const express = require('express');
const router = express.Router();

=======
const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const ticketRoutes = require('./ticketRoutes');
const commentRoutes = require('./commentRoutes');
const chatRoutes = require('./chatRoutes');
const userRoutes = require('./userRoutes');

// Mount routes
router.use('/auth', authRoutes);
router.use('/tickets', ticketRoutes);
router.use('/comments', commentRoutes);
router.use('/chat', chatRoutes);
router.use('/users', userRoutes);

// Mount comment routes as nested resource under tickets
const ticketRouter = express.Router();
ticketRouter.use('/:ticketId/comments', commentRoutes);
router.use('/tickets', ticketRouter);

>>>>>>> 74020d9ba49482918bfee0022530c45616d68dc8
// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
<<<<<<< HEAD
    environment: process.env.NODE_ENV || 'development',
    uptime: process.uptime(),
=======
>>>>>>> 74020d9ba49482918bfee0022530c45616d68dc8
  });
});

// API documentation route
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Customer Support Ticketing System API',
    version: '1.0.0',
    endpoints: {
<<<<<<< HEAD
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
=======
      auth: '/api/v1/auth',
      tickets: '/api/v1/tickets',
      comments: '/api/v1/comments',
      chat: '/api/v1/chat',
      users: '/api/v1/users',
    },
    documentation: {
      auth: {
        register: 'POST /api/v1/auth/register',
        login: 'POST /api/v1/auth/login',
        logout: 'POST /api/v1/auth/logout',
        getMe: 'GET /api/v1/auth/me',
        updateProfile: 'PUT /api/v1/auth/updateprofile',
        updatePassword: 'PUT /api/v1/auth/updatepassword',
      },
      tickets: {
        getAll: 'GET /api/v1/tickets',
        create: 'POST /api/v1/tickets',
        getOne: 'GET /api/v1/tickets/:id',
        update: 'PUT /api/v1/tickets/:id',
        delete: 'DELETE /api/v1/tickets/:id',
        assign: 'PUT /api/v1/tickets/:id/assign',
      },
      comments: {
        getAll: 'GET /api/v1/tickets/:ticketId/comments',
        create: 'POST /api/v1/tickets/:ticketId/comments',
        update: 'PUT /api/v1/comments/:id',
        delete: 'DELETE /api/v1/comments/:id',
      },
      chat: {
        send: 'POST /api/v1/chat',
        getMessages: 'GET /api/v1/chat/ticket/:ticketId',
        getConversations: 'GET /api/v1/chat/conversations',
        markAsRead: 'PUT /api/v1/chat/:id/read',
        unreadCount: 'GET /api/v1/chat/unread/count',
      },
      users: {
        getAll: 'GET /api/v1/users',
        getOne: 'GET /api/v1/users/:id',
        update: 'PUT /api/v1/users/:id',
        delete: 'DELETE /api/v1/users/:id',
        deactivate: 'PUT /api/v1/users/:id/deactivate',
        activate: 'PUT /api/v1/users/:id/activate',
        stats: 'GET /api/v1/users/stats',
        admins: 'GET /api/v1/users/admins',
      },
    },
  });
});

module.exports = router;
>>>>>>> 74020d9ba49482918bfee0022530c45616d68dc8
