const express = require('express');
const router = express.Router();
const {
  sendMessage,
  getChatMessages,
  getConversations,
  markAsRead,
  getUnreadCount,
} = require('../controllers/chatController');
const { protect } = require('../middleware/auth');
const upload = require('../config/multer');

// All routes require authentication
router.use(protect);

// Chat routes
router.post('/', upload.single('attachment'), sendMessage);
router.get('/conversations', getConversations);
router.get('/unread/count', getUnreadCount);
router.get('/ticket/:ticketId', getChatMessages);
router.put('/:id/read', markAsRead);

module.exports = router;
