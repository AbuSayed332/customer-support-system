const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  deactivateUser,
  activateUser,
  getUserStats,
  getAllAdmins,
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

// All routes require authentication and admin role
router.use(protect);

// Public to authenticated users
router.get('/admins', getAllAdmins); // Get list of admins for assignment

// Admin only routes
router.use(authorize('admin'));

router.get('/stats', getUserStats);
router.get('/', getAllUsers);

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

router.put('/:id/deactivate', deactivateUser);
router.put('/:id/activate', activateUser);

module.exports = router;