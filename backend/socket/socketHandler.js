const socketIO = require('socket.io');

// Store connected users
const connectedUsers = new Map();

const initializeSocket = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      methods: ['GET', 'POST'],
      credentials: true,
    }
  });

  io.on('connection', (socket) => {
    console.log(` User connected: ${socket.id}`);

    // Store user connection (without authentication for now)
    connectedUsers.set(socket.id, {
      socketId: socket.id,
      connectedAt: new Date(),
    });

    // Basic chat functionality
    socket.on('join_ticket', (ticketId) => {
      socket.join(`ticket_${ticketId}`);
      console.log(`User ${socket.id} joined ticket: ${ticketId}`);
    });

    socket.on('leave_ticket', (ticketId) => {
      socket.leave(`ticket_${ticketId}`);
      console.log(`User ${socket.id} left ticket: ${ticketId}`);
    });

    socket.on('send_message', (data) => {
      const { ticketId, message, user = {} } = data;
      socket.to(`ticket_${ticketId}`).emit('new_message', {
        message,
        user: {
          id: socket.id,
          name: user.name || 'Anonymous',
          role: user.role || 'customer'
        },
        timestamp: new Date()
      });
    });

    socket.on('typing', (data) => {
      const { ticketId, user = {} } = data;
      socket.to(`ticket_${ticketId}`).emit('user_typing', {
        ticketId,
        userId: socket.id,
        userName: user.name || 'Anonymous'
      });
    });

    socket.on('stop_typing', (data) => {
      const { ticketId } = data;
      socket.to(`ticket_${ticketId}`).emit('user_stop_typing', {
        ticketId,
        userId: socket.id
      });
    });

    socket.on('disconnect', () => {
      console.log(` User disconnected: ${socket.id}`);
      connectedUsers.delete(socket.id);
    });
  });

  console.log(' Socket.IO server initialized');
  return io;
};

module.exports = { initializeSocket };
