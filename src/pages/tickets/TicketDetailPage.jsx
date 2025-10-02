import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, MessageSquare } from 'lucide-react';
import ticketService from '../../services/ticketService';
import commentService from '../../services/commentService';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Loader from '../../components/common/Loader';
import TextArea from '../../components/common/TextArea';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { formatDateTime, formatTimeAgo } from '../../utils/formatters';
import { getStatusColor, getPriorityColor } from '../../utils/helpers';
import { toast } from 'react-toastify';

const TicketDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [ticket, setTicket] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    fetchTicketDetails();
    fetchComments();
  }, [id]);

  const fetchTicketDetails = async () => {
    try {
      const response = await ticketService.getById(id);
      setTicket(response.data);
    } catch (error) {
      toast.error('Failed to load ticket');
      navigate('/tickets');
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await commentService.getByTicket(id);
      setComments(response.data || []);
    } catch (error) {
      console.error('Failed to load comments:', error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    
    if (!newComment.trim()) {
      return;
    }

    setCommentLoading(true);
    try {
      await commentService.create(id, { content: newComment });
      setNewComment('');
      fetchComments();
      toast.success('Comment added');
    } catch (error) {
      toast.error('Failed to add comment');
    } finally {
      setCommentLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await ticketService.delete(id);
      toast.success('Ticket deleted');
      navigate('/tickets');
    } catch (error) {
      toast.error('Failed to delete ticket');
    }
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!ticket) {
    return null;
  }

  const canEdit = user?.role === 'admin' || ticket.customer?._id === user?.id;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate('/tickets')}>
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Tickets
        </Button>
        
        {canEdit && (
          <div className="flex space-x-2">
            <Button
              variant="secondary"
              onClick={() => navigate(`/tickets/${id}/edit`)}
            >
              <Edit className="w-5 h-5 mr-2" />
              Edit
            </Button>
            {user?.role === 'admin' && (
              <Button
                variant="danger"
                onClick={() => setDeleteDialogOpen(true)}
              >
                <Trash2 className="w-5 h-5 mr-2" />
                Delete
              </Button>
            )}
            <Button onClick={() => navigate(`/chat/${id}`)}>
              <MessageSquare className="w-5 h-5 mr-2" />
              Chat
            </Button>
          </div>
        )}
      </div>

      {/* Ticket Details */}
      <Card>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-500">
              {ticket.ticketNumber}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
              {ticket.status}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
              {ticket.priority}
            </span>
            <Badge variant="default">{ticket.category}</Badge>
          </div>

          <h1 className="text-3xl font-bold text-gray-900">{ticket.subject}</h1>

          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <div>
              <span className="font-medium">Created by:</span> {ticket.customer?.name}
            </div>
            <div>
              <span className="font-medium">Created:</span> {formatDateTime(ticket.createdAt)}
            </div>
            {ticket.assignedTo && (
              <div>
                <span className="font-medium">Assigned to:</span> {ticket.assignedTo.name}
              </div>
            )}
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap">{ticket.description}</p>
          </div>

          {/* Attachments */}
          {ticket.attachments && ticket.attachments.length > 0 && (
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Attachments</h3>
              <div className="space-y-2">
                {ticket.attachments.map((file, index) => (
                  <a
                    key={index}
                    href={`${process.env.REACT_APP_API_URL}/${file.path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                  >
                    <span className="text-sm text-gray-700">{file.originalName}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Comments Section */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">
          Comments ({comments.length})
        </h2>

        {/* Add Comment Form */}
        <form onSubmit={handleAddComment} className="mb-6">
          <TextArea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            rows={3}
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" loading={commentLoading}>
              Add Comment
            </Button>
          </div>
        </form>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No comments yet</p>
          ) : (
            comments.map((comment) => (
              <div key={comment._id} className="border-l-4 border-primary-200 pl-4 py-2">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-medium text-gray-900">
                    {comment.author?.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatTimeAgo(comment.createdAt)}
                  </span>
                  {comment.edited && (
                    <span className="text-xs text-gray-400">(edited)</span>
                  )}
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Ticket"
        message="Are you sure you want to delete this ticket? This action cannot be undone."
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
};

export default TicketDetailPage;