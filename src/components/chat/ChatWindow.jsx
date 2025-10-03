import React, { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, X } from 'lucide-react';
import { useSocket } from '../../context/SocketContext';
import { useAuth } from '../../context/AuthContext';
import chatService from '../../services/chatService';
import Avatar from '../common/Avatar';
import { formatTimeAgo } from '../../utils/formatters';
import { toast } from 'react-toastify';

const ChatWindow = ({ ticketId, receiverId, receiverName }) => {
  const { socket, connected } = useSocket();
  const { user } = useAuth();
  const messagesEndRef = useRef(null);
  
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (ticketId && connected) {
      socket.joinTicket(ticketId);
      fetchMessages();

      // Listen for new messages
      socket.on('message_received', handleNewMessage);
      socket.on('user_typing', handleTyping);
      socket.on('user_stop_typing', handleStopTyping);

      return () => {
        socket.off('message_received', handleNewMessage);
        socket.off('user_typing', handleTyping);
        socket.off('user_stop_typing', handleStopTyping);
        socket.leaveTicket(ticketId);
      };
    }
  }, [ticketId, connected]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const handleTyping = (data) => {
    if (data.userId !== user?.id) {
      setTyping(true);
      setTimeout(() => setTyping(false), 3000);
    }
  };

  const handleStopTyping = () => {
    setTyping(false);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!newMessage.trim() && !attachment) {
      return;
    }

    try {
      await socket.sendMessage({
        ticketId,
        receiverId,
        message: newMessage,
        attachment,
      });

      setNewMessage('');
      setAttachment(null);
      socket.stopTyping(ticketId);
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  const handleTypingStart = () => {
    if (!typing) {
      socket.startTyping(ticketId);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachment(file);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-card">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-3">
          <Avatar name={receiverName} size="medium" />
          <div>
            <h3 className="font-semibold text-gray-900">{receiverName}</h3>
            {connected ? (
              <p className="text-sm text-green-600">Online</p>
            ) : (
              <p className="text-sm text-gray-500">Offline</p>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((message) => {
            const isOwn = message.sender?._id === user?.id;
            return (
              <div
                key={message._id}
                className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex space-x-2 max-w-xs lg:max-w-md ${isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <Avatar name={message.sender?.name} size="small" />
                  <div>
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        isOwn
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatTimeAgo(message.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
        
        {typing && (
          <div className="flex items-center space-x-2 text-gray-500 text-sm">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
            </div>
            <span>typing...</span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSendMessage} className="border-t p-4">
        {attachment && (
          <div className="flex items-center justify-between mb-2 p-2 bg-gray-50 rounded">
            <span className="text-sm text-gray-700">{attachment.name}</span>
            <button
              type="button"
              onClick={() => setAttachment(null)}
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <label className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg">
            <Paperclip className="w-5 h-5 text-gray-600" />
            <input
              type="file"
              onChange={handleFileSelect}
              className="hidden"
              accept="image/*,.pdf,.doc,.docx"
            />
          </label>
          
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleTypingStart}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          
          <button
            type="submit"
            disabled={!newMessage.trim() && !attachment}
            className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;