import api from './api';

const adminService = {
  getDashboardStats: async () => {
    // This endpoint should return stats like { totalTickets, openTickets, resolvedTickets, totalUsers }
    return await api.get('/admin/stats');
  },

  getUsers: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return await api.get(`/admin/users?${queryString}`);
  },
  // Other admin-specific functions can be added here
};

export default adminService;