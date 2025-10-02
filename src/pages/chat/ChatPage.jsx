import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import chatService from '../../services/chatService';
import ticketService from '../../services/ticketService';
import ChatWindow from '../../components/chat/ChatWindow';
import Card from '../../components/common/Card';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import { MessageSquare } from 'lucide-react';

const ChatPage = () => {
  const { ticketId } = useParams();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ticketId) {
      loadTicketConversation();
    } else {
      loadConversations();
    }
  }, [ticketId]);

  const loadTicketConversation = async () => {
    try {
      const response = await ticketService.getById(ticketId);
      const ticket = response.data;
      setSelectedConversation({
        ticketId: ticket._id,
        receiverId: ticket.assignedTo?._id,
        receiverName: ticket.assignedTo?.name || 'Support Team',
        ticketNumber: ticket.ticketNumber,
      });
    } catch (error) {
      console.error('Failed to load ticket:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadConversations = async () => {
    try {
      const response = await chatService.getConversations();
      setConversations(response.data || []);
      if (response.data?.length > 0) {
        setSelectedConversation(response.data[0]);
      }
    } catch (error) {
      console.error('Failed to load conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Chat</h1>

      {selectedConversation ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Conversations List (if not viewing specific ticket) */}
          {!ticketId && (
            <Card className="lg:col-span-1">
              <h2 className="font-semibold mb-4">Conversations</h2>
              <div className="space-y-2">
                {conversations.map((conv) => (
                  <div
                    key={conv._id}
                    onClick={() => setSelectedConversation(conv)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedConversation?._id === conv._id
                        ? 'bg-primary-50 border border-primary-200'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <p className="font-medium text-sm">{conv.ticketNumber}</p>
                    <p className="text-xs text-gray-500">{conv.receiverName}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Chat Window */}
          <div className={ticketId ? 'lg:col-span-4' : 'lg:col-span-3'}>
            <ChatWindow
              ticketId={selectedConversation.ticketId}
              receiverId={selectedConversation.receiverId}
              receiverName={selectedConversation.receiverName}
            />
          </div>
        </div>
      ) : (
        <EmptyState
          icon={MessageSquare}
          title="No conversations"
          message="Start a conversation by creating a support ticket"
        />
      )}
    </div>
  );
};

export default ChatPage;