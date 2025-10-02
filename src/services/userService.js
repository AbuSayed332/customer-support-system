import api from './api';

const userService = {
  // Get all users
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return await api.get(`/users?${queryString}`);
  },

  // Get single user
  getById: async (id) => {
    return await api.get(`/users/${id}`);
  },

  // Update user
  update: async (id, userData) => {
    return await api.put(`/users/${id}`, userData);
  },

  // Delete user
  delete: async (id) => {
    return await api.delete(`/users/${id}`);
  },

  // Deactivate user
  deactivate: async (id) => {
    return await api.put(`/users/${id}/deactivate`);
  },

  // Activate user
  activate: async (id) => {
    return await api.put(`/users/${id}/activate`);
  },

  // Get user statistics
  getStats: async () => {
    return await api.get('/users/stats');
  },

  // Get all admins
  getAdmins: async () => {
    return await api.get('/users/admins');
  },
};

export default userService;