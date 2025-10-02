import api from './api';

const commentService = {
  // Get comments for a ticket
  getByTicket: async (ticketId) => {
    return await api.get(`/tickets/${ticketId}/comments`);
  },

  // Add comment to ticket
  create: async (ticketId, commentData) => {
    const formData = new FormData();
    formData.append('content', commentData.content);
    
    if (commentData.isInternal) {
      formData.append('isInternal', commentData.isInternal);
    }
    
    if (commentData.attachments && commentData.attachments.length > 0) {
      commentData.attachments.forEach((file) => {
        formData.append('attachments', file);
      });
    }
    
    return await api.post(`/tickets/${ticketId}/comments`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  // Update comment
  update: async (id, content) => {
    return await api.put(`/comments/${id}`, { content });
  },

  // Delete comment
  delete: async (id) => {
    return await api.delete(`/comments/${id}`);
  },
};

export default commentService;
