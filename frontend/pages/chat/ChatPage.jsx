import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChatWindow from '../../components/chat/ChatWindow';
import ticketService from '../../services/ticketService';
import Card from '../../components/common/Card';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import { MessageSquare } from 'lucide-react';

const ChatPage = () => {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ticketId) {
      fetchTicket();
    } else {
      setLoading(false);
    }
  }, [ticketId]);

  const fetchTicket = async () => {
    try {
      const response = await ticketService.getById(ticketId);
      setTicket(response.data);
    } catch (error) {
      console.error('Failed to load ticket:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!ticketId || !ticket) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <EmptyState
            icon={MessageSquare}
            title="No Chat Selected"
            message="Select a ticket to start chatting"
          />
        </Card>
      </div>
    );
  }

  // Determine receiver based on user role
  const receiverId = ticket.assignedTo?._id || ticket.customer?._id;
  const receiverName = ticket.assignedTo?.name || ticket.customer?.name;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Chat</h1>
        <p className="text-gray-600 mt-1">
          Ticket: {ticket.ticketNumber} - {ticket.subject}
        </p>
      </div>

      <ChatWindow
        ticketId={ticketId}
        receiverId={receiverId}
        receiverName={receiverName}
      />
    </div>
  );
};

export default ChatPage;