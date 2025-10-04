const express = require('express');
const router = express.Router();
const {
  createTicket,
  getAllTickets,
  getTicket,
  updateTicket,
  deleteTicket,
  assignTicket,
} = require('../controllers/ticketController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../config/multer');

// All routes require authentication
router.use(protect);

// Ticket CRUD routes
router
  .route('/')
  .get(getAllTickets) // Both admin and customer
  .post(upload.array('attachments', 5), createTicket); // Both admin and customer

router
  .route('/:id')
  .get(getTicket) // Both admin and customer (with permission check)
  .put(updateTicket) // Both admin and customer (with permission check)
  .delete(authorize('admin'), deleteTicket); // Admin only

// Admin-only routes
router.put('/:id/assign', authorize('admin'), assignTicket);

module.exports = router;