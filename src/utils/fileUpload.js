const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * Get file extension
 * @param {String} filename - File name
 * @returns {String} File extension
 */
exports.getFileExtension = (filename) => {
  return path.extname(filename).toLowerCase();
};

/**
 * Generate unique filename
 * @param {String} originalName - Original filename
 * @returns {String} Unique filename
 */
exports.generateUniqueFilename = (originalName) => {
  const timestamp = Date.now();
  const randomString = crypto.randomBytes(8).toString('hex');
  const extension = path.extname(originalName);
  const baseName = path.basename(originalName, extension);
  
  return `${baseName}-${timestamp}-${randomString}${extension}`;
};

/**
 * Check if file type is allowed
 * @param {String} mimetype - File MIME type
 * @param {Array} allowedTypes - Array of allowed MIME types
 * @returns {Boolean} True if allowed
 */
exports.isFileTypeAllowed = (mimetype, allowedTypes = []) => {
  const defaultAllowed = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
  ];

  const allowedList = allowedTypes.length > 0 ? allowedTypes : defaultAllowed;
  return allowedList.includes(mimetype);
};

/**
 * Format file size to human readable
 * @param {Number} bytes - File size in bytes
 * @returns {String} Formatted size
 */
exports.formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Delete file from filesystem
 * @param {String} filePath - Path to file
 * @returns {Promise<Boolean>} True if deleted
 */
exports.deleteFile = async (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
};

/**
 * Delete multiple files
 * @param {Array} filePaths - Array of file paths
 * @returns {Promise<Object>} { deleted, failed }
 */
exports.deleteMultipleFiles = async (filePaths) => {
  const results = {
    deleted: 0,
    failed: 0,
  };

  for (const filePath of filePaths) {
    const success = await exports.deleteFile(filePath);
    if (success) {
      results.deleted++;
    } else {
      results.failed++;
    }
  }

  return results;
};

/**
 * Get file info
 * @param {String} filePath - Path to file
 * @returns {Object|null} File information
 */
exports.getFileInfo = (filePath) => {
  try {
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const stats = fs.statSync(filePath);
    return {
      size: stats.size,
      sizeFormatted: exports.formatFileSize(stats.size),
      createdAt: stats.birthtime,
      modifiedAt: stats.mtime,
      isFile: stats.isFile(),
      isDirectory: stats.isDirectory(),
    };
  } catch (error) {
    console.error('Error getting file info:', error);
    return null;
  }
};

/**
 * Create directory if not exists
 * @param {String} dirPath - Directory path
 * @returns {Boolean} True if created or exists
 */
exports.ensureDirectoryExists = (dirPath) => {
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    return true;
  } catch (error) {
    console.error('Error creating directory:', error);
    return false;
  }
};

/**
 * Move file to new location
 * @param {String} sourcePath - Source file path
 * @param {String} destPath - Destination file path
 * @returns {Promise<Boolean>} True if moved
 */
exports.moveFile = async (sourcePath, destPath) => {
  try {
    await fs.promises.rename(sourcePath, destPath);
    return true;
  } catch (error) {
    console.error('Error moving file:', error);
    return false;
  }
};

/**
 * Copy file to new location
 * @param {String} sourcePath - Source file path
 * @param {String} destPath - Destination file path
 * @returns {Promise<Boolean>} True if copied
 */
exports.copyFile = async (sourcePath, destPath) => {
  try {
    await fs.promises.copyFile(sourcePath, destPath);
    return true;
  } catch (error) {
    console.error('Error copying file:', error);
    return false;
  }
};

/**
 * Get MIME type from file extension
 * @param {String} filename - File name
 * @returns {String} MIME type
 */
exports.getMimeType = (filename) => {
  const ext = path.extname(filename).toLowerCase();
  const mimeTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.txt': 'text/plain',
  };

  return mimeTypes[ext] || 'application/octet-stream';
};

/**
 * Clean up old files in directory
 * @param {String} dirPath - Directory path
 * @param {Number} maxAge - Maximum age in milliseconds
 * @returns {Promise<Number>} Number of files deleted
 */
exports.cleanupOldFiles = async (dirPath, maxAge = 7 * 24 * 60 * 60 * 1000) => {
  try {
    if (!fs.existsSync(dirPath)) {
      return 0;
    }

    const files = await fs.promises.readdir(dirPath);
    const now = Date.now();
    let deletedCount = 0;

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stats = await fs.promises.stat(filePath);

      if (stats.isFile() && now - stats.mtime.getTime() > maxAge) {
        await fs.promises.unlink(filePath);
        deletedCount++;
      }
    }

    return deletedCount;
  } catch (error) {
    console.error('Error cleaning up old files:', error);
    return 0;
  }
};

/**
 * Validate file upload
 * @param {Object} file - Multer file object
 * @param {Object} options - Validation options
 * @returns {Object} { valid, error }
 */
exports.validateFileUpload = (file, options = {}) => {
  const {
    maxSize = 5242880, // 5MB
    allowedTypes = [],
  } = options;

  if (!file) {
    return { valid: false, error: 'No file provided' };
  }

  // Check file size
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File size exceeds maximum allowed size of ${exports.formatFileSize(maxSize)}`,
    };
  }

  // Check file type
  if (!exports.isFileTypeAllowed(file.mimetype, allowedTypes)) {
    return {
      valid: false,
      error: 'File type not allowed',
    };
  }

  return { valid: true, error: null };
};
