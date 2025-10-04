import React, { createContext, useContext, useEffect, useState } from 'react';
import socketService from '../services/socketService';
import { useAuth } from './AuthContext';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (isAuthenticated && user) {
      const token = localStorage.getItem('token');
      const socketInstance = socketService.connect(token);
      setSocket(socketInstance);

      // Listen for connection status
      socketService.on('connected', (data) => {
        setConnected(true);
        console.log('Socket connected:', data);
      });

      socketService.on('disconnect', () => {
        setConnected(false);
      });

      // Listen for online users updates
      socketService.on('online_users', (users) => {
        setOnlineUsers(users);
      });

      socketService.on('user_online', (userData) => {
        setOnlineUsers((prev) => [...prev, userData]);
      });

      socketService.on('user_offline', (userData) => {
        setOnlineUsers((prev) => prev.filter((u) => u.userId !== userData.userId));
      });

      return () => {
        socketService.disconnect();
        setConnected(false);
      };
    }
  }, [isAuthenticated, user]);

  const value = {
    socket: socketService,
    connected,
    onlineUsers,
    joinTicket: socketService.joinTicket.bind(socketService),
    leaveTicket: socketService.leaveTicket.bind(socketService),
    sendMessage: socketService.sendMessage.bind(socketService),
    startTyping: socketService.startTyping.bind(socketService),
    stopTyping: socketService.stopTyping.bind(socketService),
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within SocketProvider');
  }
  return context;
};

export default SocketContext;
