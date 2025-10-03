import { useState, useEffect } from 'react';
import commentService from '../services/commentService';
import { toast } from 'react-toastify';

const useComments = (ticketId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (ticketId) {
      fetchComments();
    }
  }, [ticketId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await commentService.getByTicket(ticketId);
      setComments(response.data || []);
      setError(null);
    } catch (err) {
      setError(err);
      toast.error('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (content) => {
    try {
      await commentService.create(ticketId, { content });
      await fetchComments();
      toast.success('Comment added');
    } catch (err) {
      toast.error('Failed to add comment');
      throw err;
    }
  };

  const updateComment = async (commentId, content) => {
    try {
      await commentService.update(commentId, content);
      await fetchComments();
      toast.success('Comment updated');
    } catch (err) {
      toast.error('Failed to update comment');
      throw err;
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await commentService.delete(commentId);
      await fetchComments();
      toast.success('Comment deleted');
    } catch (err) {
      toast.error('Failed to delete comment');
      throw err;
    }
  };

  return {
    comments,
    loading,
    error,
    refresh: fetchComments,
    addComment,
    updateComment,
    deleteComment,
  };
};

export default useComments;
