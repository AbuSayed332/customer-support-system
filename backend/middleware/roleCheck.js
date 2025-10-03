/**
 * Check if user has admin role
 */
exports.isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required',
    });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin privileges required.',
    });
  }

  next();
};

/**
 * Check if user has customer role
 */
exports.isCustomer = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required',
    });
  }

  if (req.user.role !== 'customer') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Customer privileges required.',
    });
  }

  next();
};

/**
 * Check if user is either admin or customer
 */
exports.isAuthenticated = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required',
    });
  }

  next();
};

/**
 * Check if user is the owner of the resource or admin
 */
exports.isOwnerOrAdmin = (resourceUserId) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }

    // Admin can access any resource
    if (req.user.role === 'admin') {
      return next();
    }

    // Check if user is the owner
    if (req.user.id.toString() === resourceUserId.toString()) {
      return next();
    }

    return res.status(403).json({
      success: false,
      message: 'Access denied. You do not have permission to access this resource.',
    });
  };
};

/**
 * Check multiple roles
 */
exports.hasAnyRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required roles: ${roles.join(', ')}`,
      });
    }

    next();
  };
};

/**
 * Check if user can modify resource
 */
exports.canModify = (Model) => {
  return async (req, res, next) => {
    try {
      const resource = await Model.findById(req.params.id);

      if (!resource) {
        return res.status(404).json({
          success: false,
          message: 'Resource not found',
        });
      }

      // Admin can modify anything
      if (req.user.role === 'admin') {
        return next();
      }

      // Check if user is the owner/creator
      const ownerField = resource.customer || resource.author || resource.createdBy;
      
      if (ownerField && ownerField.toString() === req.user.id.toString()) {
        return next();
      }

      return res.status(403).json({
        success: false,
        message: 'You do not have permission to modify this resource',
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error checking permissions',
        error: error.message,
      });
    }
  };
};