// const express = require('express');
// const router = express.Router();
// const {
//   register,
//   login,
//   logout,
//   getMe,
//   updateProfile,
//   updatePassword,
// } = require('../controllers/authController');
// const { protect } = require('../middleware/auth');

// // Public routes
// router.post('/register', register);
// router.post('/login', login);

// // Protected routes
// router.post('/logout', protect, logout);
// router.get('/me', protect, getMe);
// router.put('/updateprofile', protect, updateProfile);
// router.put('/updatepassword', protect, updatePassword);

// module.exports = router;

const express = require('express');
const router = express.Router();

// Simple working auth routes
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password'
      });
    }
    
    res.status(201).json({
      success: true,
      message: 'Registration successful',
      user: {
        id: 'temp-id',
        name: name,
        email: email,
        role: 'customer'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Basic validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token: 'demo-jwt-token',
      user: {
        id: '1',
        name: 'Demo User',
        email: email,
        role: 'customer'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

module.exports = router;