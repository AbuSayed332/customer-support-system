import { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';
import chatService from '../services/chatService';

const useChat = (ticketId) => {
  const { socket, connected } = useSocket();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (ticketId && connected) {
      fetchMessages();
      socket.joinTicket(ticketId);

      socket.on('message_received', handleNewMessage);
      socket.on('user_typing', () => setTyping(true));
      socket.on('user_stop_typing', () => setTyping(false));

      return () => {
        socket.off('message_received', handleNewMessage);
        socket.off('user_typing');
        socket.off('user_stop_typing');
        socket.leaveTicket(ticketId);
      };
    }
  }, [ticketId, connected]);

  const fetchMessages = async () => {
    try {
      const response = await chatService.getMessages(ticketId);
      setMessages(response.data || []);
    } catch (error) {
      console.error('Failed to load messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  const sendMessage = async (messageData) => {
    await socket.sendMessage({
      ticketId,
      ...messageData,
    });
  };

  return {
    messages,
    loading,
    typing,
    sendMessage,
    refresh: fetchMessages,
  };
};

export default useChat;