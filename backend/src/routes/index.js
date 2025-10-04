// const express = require('express');
// const router = express.Router();

// const authRoutes = require('./authRoutes');
// const ticketRoutes = require('./ticketRoutes');
// const commentRoutes = require('./commentRoutes');
// const chatRoutes = require('./chatRoutes');
// const userRoutes = require('./userRoutes');

// // Mount routes
// router.use('/auth', authRoutes);
// router.use('/tickets', ticketRoutes);
// router.use('/comments', commentRoutes);
// router.use('/chat', chatRoutes);
// router.use('/users', userRoutes);

// // Mount comment routes as nested resource under tickets
// const ticketRouter = express.Router();
// ticketRouter.use('/:ticketId/comments', commentRoutes);
// router.use('/tickets', ticketRouter);

// // Health check route
// router.get('/health', (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: 'API is running',
//     timestamp: new Date().toISOString(),
//   });
// });

// // API documentation route
// router.get('/', (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: 'Customer Support Ticketing System API',
//     version: '1.0.0',
//     endpoints: {
//       auth: '/api/v1/auth',
//       tickets: '/api/v1/tickets',
//       comments: '/api/v1/comments',
//       chat: '/api/v1/chat',
//       users: '/api/v1/users',
//     },
//     documentation: {
//       auth: {
//         register: 'POST /api/v1/auth/register',
//         login: 'POST /api/v1/auth/login',
//         logout: 'POST /api/v1/auth/logout',
//         getMe: 'GET /api/v1/auth/me',
//         updateProfile: 'PUT /api/v1/auth/updateprofile',
//         updatePassword: 'PUT /api/v1/auth/updatepassword',
//       },
//       tickets: {
//         getAll: 'GET /api/v1/tickets',
//         create: 'POST /api/v1/tickets',
//         getOne: 'GET /api/v1/tickets/:id',
//         update: 'PUT /api/v1/tickets/:id',
//         delete: 'DELETE /api/v1/tickets/:id',
//         assign: 'PUT /api/v1/tickets/:id/assign',
//       },
//       comments: {
//         getAll: 'GET /api/v1/tickets/:ticketId/comments',
//         create: 'POST /api/v1/tickets/:ticketId/comments',
//         update: 'PUT /api/v1/comments/:id',
//         delete: 'DELETE /api/v1/comments/:id',
//       },
//       chat: {
//         send: 'POST /api/v1/chat',
//         getMessages: 'GET /api/v1/chat/ticket/:ticketId',
//         getConversations: 'GET /api/v1/chat/conversations',
//         markAsRead: 'PUT /api/v1/chat/:id/read',
//         unreadCount: 'GET /api/v1/chat/unread/count',
//       },
//       users: {
//         getAll: 'GET /api/v1/users',
//         getOne: 'GET /api/v1/users/:id',
//         update: 'PUT /api/v1/users/:id',
//         delete: 'DELETE /api/v1/users/:id',
//         deactivate: 'PUT /api/v1/users/:id/deactivate',
//         activate: 'PUT /api/v1/users/:id/activate',
//         stats: 'GET /api/v1/users/stats',
//         admins: 'GET /api/v1/users/admins',
//       },
//     },
//   });
// });

// module.exports = router;

const express = require('express');
const router = express.Router();

// Import route files
const authRoutes = require('./authRoutes');
// const ticketRoutes = require('./ticketRoutes');
// const commentRoutes = require('./commentRoutes');
// const chatRoutes = require('./chatRoutes');
// const userRoutes = require('./userRoutes');

// Mount routes
router.use('/auth', authRoutes);
// router.use('/tickets', ticketRoutes);
// router.use('/comments', commentRoutes);
// router.use('/chat', chatRoutes);
// router.use('/users', userRoutes);

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
  });
});

// API documentation route
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Customer Support Ticketing System API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/v1/auth',
      health: '/api/v1/health'
    }
  });
});

module.exports = router;