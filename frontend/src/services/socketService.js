import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
  }

  connect(token) {
    if (this.socket?.connected) {
      return this.socket;
    }

    this.socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000', {
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    this.setupDefaultListeners();
    return this.socket;
  }

  setupDefaultListeners() {
    this.socket.on('connect', () => {
      console.log('✅ Socket connected:', this.socket.id);
    });

    this.socket.on('disconnect', (reason) => {
      console.log('❌ Socket disconnected:', reason);
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.listeners.clear();
    }
  }

  on(event, callback) {
    if (!this.socket) return;
    
    this.socket.on(event, callback);
    
    // Store callback for cleanup
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  off(event, callback) {
    if (!this.socket) return;
    
    if (callback) {
      this.socket.off(event, callback);
      
      // Remove from stored callbacks
      const callbacks = this.listeners.get(event);
      if (callbacks) {
        const index = callbacks.indexOf(callback);
        if (index > -1) {
          callbacks.splice(index, 1);
        }
      }
    } else {
      this.socket.off(event);
      this.listeners.delete(event);
    }
  }

  emit(event, data) {
    if (!this.socket) return;
    this.socket.emit(event, data);
  }

  // Join ticket room
  joinTicket(ticketId) {
    this.emit('join_ticket', { ticketId });
  }

  // Leave ticket room
  leaveTicket(ticketId) {
    this.emit('leave_ticket', { ticketId });
  }

  // Send message
  sendMessage(data) {
    this.emit('send_message', data);
  }

  // Typing indicator
  startTyping(ticketId) {
    this.emit('typing', { ticketId });
  }

  stopTyping(ticketId) {
    this.emit('stop_typing', { ticketId });
  }

  // Mark message as read
  markAsRead(messageId, ticketId) {
    this.emit('mark_as_read', { messageId, ticketId });
  }

  // Get online users
  getOnlineUsers() {
    this.emit('get_online_users');
  }

  isConnected() {
    return this.socket?.connected || false;
  }
}

// Export singleton instance
export default new SocketService();