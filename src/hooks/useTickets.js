import { useState, useEffect } from 'react';
import ticketService from '../services/ticketService';
import { toast } from 'react-toastify';

const useTickets = (filters = {}) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
  });

  useEffect(() => {
    fetchTickets();
  }, [filters, pagination.currentPage]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await ticketService.getAll({
        ...filters,
        page: pagination.currentPage,
        limit: 10,
      });
      
      // Handle different response structures safely
      const ticketData = response?.data || [];
      const totalCount = response?.total || 0;
      const paginationData = response?.pagination || {};
      
      setTickets(Array.isArray(ticketData) ? ticketData : []);
      setPagination({
        currentPage: pagination.currentPage,
        totalPages: totalCount > 0 ? Math.ceil(totalCount / 10) : 1,
        total: totalCount,
      });
    } catch (err) {
      console.error('Failed to fetch tickets:', err);
      setError(err);
      setTickets([]);
      setPagination({
        currentPage: 1,
        totalPages: 1,
        total: 0,
      });
      toast.error('Failed to load tickets');
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    fetchTickets();
  };

  return {
    tickets,
    loading,
    error,
    pagination,
    refresh,
    setPage: (page) => setPagination({ ...pagination, currentPage: page }),
  };
};

export default useTickets;