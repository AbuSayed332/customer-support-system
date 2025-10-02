import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Filter } from 'lucide-react';
import ticketService from '../../services/ticketService';
import { TICKET_STATUS, TICKET_PRIORITY, STATUS_COLORS, PRIORITY_COLORS, PAGINATION } from '../../utils/constants';

import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import Pagination from '../../components/common/Pagination';
import Select from '../../components/common/Select';
import Badge from '../../components/common/Badge';

const TicketsPage = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPaginationState] = useState({
    page: PAGINATION.DEFAULT_PAGE,
    limit: PAGINATION.DEFAULT_LIMIT,
    totalPages: 1,
    totalItems: 0,
  });
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
  });

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...filters,
      };
      // Remove empty filters
      Object.keys(params).forEach(key => {
        if (params[key] === '' || params[key] === null) {
          delete params[key];
        }
      });

      const response = await ticketService.getAll(params);
      setTickets(response.data.tickets || []);
      setPaginationState({
        ...pagination,
        totalPages: response.data.pagination.totalPages,
        totalItems: response.data.pagination.totalItems,
      });
    } catch (err) {
      setError('Failed to fetch tickets. Please try again later.');
      console.error('Failed to fetch tickets:', err);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, filters]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const handlePageChange = (page) => {
    setPaginationState(prev => ({ ...prev, page }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPaginationState(prev => ({ ...prev, page: 1 })); // Reset to first page on filter change
  };

  const getStatusOptions = () => [
    { value: '', label: 'All Statuses' },
    ...Object.values(TICKET_STATUS).map(status => ({ value: status, label: status }))
  ];

  const getPriorityOptions = () => [
    { value: '', label: 'All Priorities' },
    ...Object.values(TICKET_PRIORITY).map(priority => ({ value: priority, label: priority }))
  ];

  if (loading && tickets.length === 0) {
    return <Loader fullScreen />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Tickets</h1>
        <Button onClick={() => navigate('/tickets/create')}>
          <PlusCircle className="mr-2 h-5 w-5" />
          Create Ticket
        </Button>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row gap-4 mb-4 p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <h3 className="font-semibold">Filters</h3>
          </div>
          <Select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            options={getStatusOptions()}
            className="w-full md:w-48"
          />
          <Select
            name="priority"
            value={filters.priority}
            onChange={handleFilterChange}
            options={getPriorityOptions()}
            className="w-full md:w-48"
          />
        </div>

        {error && <p className="text-red-500 text-center p-4">{error}</p>}

        {loading && <Loader />}

        {!loading && tickets.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold">No tickets found</h3>
            <p className="text-gray-500 mt-2">
              {filters.status || filters.priority ? 'Try adjusting your filters.' : 'Get started by creating a new ticket.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => navigate(`/tickets/${ticket._id}`)}
              >
                <div className="flex-grow mb-3 md:mb-0">
                  <h3 className="font-semibold text-lg text-gray-900">{ticket.subject}</h3>
                  <p className="text-sm text-gray-500">#{ticket.ticketNumber} &bull; Created: {new Date(ticket.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge color={PRIORITY_COLORS[ticket.priority] || 'gray'}>
                    {ticket.priority}
                  </Badge>
                  <Badge color={STATUS_COLORS[ticket.status] || 'gray'}>
                    {ticket.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}

        {pagination.totalPages > 1 && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </Card>
    </div>
  );
};

export default TicketsPage;