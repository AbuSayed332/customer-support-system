import api from './api';

const ticketService = {
  // Get all tickets
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return await api.get(`/tickets?${queryString}`);
  },

  // Get single ticket
  getById: async (id) => {
    return await api.get(`/tickets/${id}`);
  },

  // Create ticket
  create: async (ticketData) => {
    const formData = new FormData();
    
    // Append text fields
    Object.keys(ticketData).forEach((key) => {
      if (key !== 'attachments') {
        formData.append(key, ticketData[key]);
      }
    });
    
    // Append files
    if (ticketData.attachments && ticketData.attachments.length > 0) {
      ticketData.attachments.forEach((file) => {
        formData.append('attachments', file);
      });
    }
    
    return await api.post('/tickets', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  // Update ticket
  update: async (id, ticketData) => {
    return await api.put(`/tickets/${id}`, ticketData);
  },

  // Delete ticket
  delete: async (id) => {
    return await api.delete(`/tickets/${id}`);
  },

  // Assign ticket
  assign: async (id, adminId) => {
    return await api.put(`/tickets/${id}/assign`, { adminId });
  },

  // Add a message to a ticket
  addMessage: async (id, messageData) => {
    const formData = new FormData();

    // Append text field
    if (messageData.text) {
      formData.append('text', messageData.text);
    }

    // Append files
    if (messageData.attachments && messageData.attachments.length > 0) {
      messageData.attachments.forEach((file) => {
        formData.append('attachments', file);
      });
    }

    return await api.post(`/tickets/${id}/messages`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export default ticketService;