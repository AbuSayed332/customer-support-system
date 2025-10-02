import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, User, MessageSquare } from 'lucide-react';
import Badge from '../common/Badge';
import { formatTimeAgo } from '../../utils/formatters';
import { getStatusColor, getPriorityColor } from '../../utils/helpers';

const TicketCard = ({ ticket }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/tickets/${ticket._id}`)}
      className="bg-white rounded-lg shadow-card p-6 hover:shadow-card-hover transition-shadow cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm font-medium text-gray-500">
              {ticket.ticketNumber}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
              {ticket.status}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
              {ticket.priority}
            </span>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {ticket.subject}
          </h3>
          
          <p className="text-gray-600 mb-4 line-clamp-2">
            {ticket.description}
          </p>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              {ticket.customer?.name || 'Unknown'}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {formatTimeAgo(ticket.createdAt)}
            </div>
            <div className="flex items-center">
              <MessageSquare className="w-4 h-4 mr-1" />
              {ticket.commentCount || 0} comments
            </div>
          </div>
        </div>
        
        <Badge variant="default">{ticket.category}</Badge>
      </div>
    </div>
  );
};

export default TicketCard;