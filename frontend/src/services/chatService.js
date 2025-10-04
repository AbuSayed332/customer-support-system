import api from './api';

const chatService = {
  // Send chat message
  sendMessage: async (messageData) => {
    const formData = new FormData();
    formData.append('ticketId', messageData.ticketId);
    formData.append('receiverId', messageData.receiverId);
    formData.append('message', messageData.message);
    
    if (messageData.messageType) {
      formData.append('messageType', messageData.messageType);
    }
    
    if (messageData.attachment) {
      formData.append('attachment', messageData.attachment);
    }
    
    return await api.post('/chat', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  // Get messages for a ticket
  getMessages: async (ticketId) => {
    return await api.get(`/chat/ticket/${ticketId}`);
  },

  // Get all conversations
  getConversations: async () => {
    return await api.get('/chat/conversations');
  },

  // Mark message as read
  markAsRead: async (messageId) => {
    return await api.put(`/chat/${messageId}/read`);
  },

  // Get unread count
  getUnreadCount: async () => {
    return await api.get('/chat/unread/count');
  },
};

export default chatService;