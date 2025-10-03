const express = require('express');
const router = express.Router({ mergeParams: true }); // Enable access to :ticketId from parent router
const {
  addComment,
  getComments,
  updateComment,
  deleteComment,
} = require('../controllers/commentController');
const { protect } = require('../middleware/auth');
const upload = require('../config/multer');

// All routes require authentication
router.use(protect);

// Comment routes for specific ticket
// These routes are accessed via /api/v1/tickets/:ticketId/comments
router
  .route('/')
  .get(getComments) // Get all comments for a ticket
  .post(upload.array('attachments', 3), addComment); // Add comment to ticket

// Direct comment routes
// These routes are accessed via /api/v1/comments/:id
router
  .route('/:id')
  .put(updateComment) // Update own comment
  .delete(deleteComment); // Delete own comment or admin can delete any

module.exports = router;