import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import ticketService from '../../services/ticketService';
import TicketCard from '../../components/tickets/TicketCard';
import Button from '../../components/common/Button';
import SearchBar from '../../components/common/SearchBar';
import Select from '../../components/common/Select';
import EmptyState from '../../components/common/EmptyState';
import Loader from '../../components/common/Loader';
import Pagination from '../../components/common/Pagination';
import { TICKET_STATUS, TICKET_PRIORITY, TICKET_CATEGORY } from '../../utils/constants';

const TicketsPage = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
    category: '',
  });
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
      const response = await ticketService.getAll({
        page: pagination.currentPage,
        limit: 10,
        search: filters.search,
        status: filters.status,
        priority: filters.priority,
        category: filters.category,
      });
      
      console.log('API Response:', response); // Debug log
      
      // Handle multiple possible response structures
      let ticketsData = [];
      let total = 0;
      let totalPages = 1;
      let currentPage = pagination.currentPage;
      
      if (response.data) {
        // Structure 1: { data: { tickets: [...], total: 10, ... } }
        if (response.data.tickets && Array.isArray(response.data.tickets)) {
          ticketsData = response.data.tickets;
          total = response.data.total || ticketsData.length;
          totalPages = response.data.totalPages || Math.ceil(total / 10);
          currentPage = response.data.currentPage || pagination.currentPage;
        }
        // Structure 2: { data: [...] }
        else if (Array.isArray(response.data)) {
          ticketsData = response.data;
          total = response.total || ticketsData.length;
          totalPages = Math.ceil(total / 10);
        }
        // Structure 3: { data: { } } - empty object
        else {
          ticketsData = [];
          total = 0;
          totalPages = 1;
        }
      }
      // Structure 4: Direct array
      else if (Array.isArray(response)) {
        ticketsData = response;
        total = ticketsData.length;
        totalPages = Math.ceil(total / 10);
      }
      
      setTickets(ticketsData);
      setPagination({
        currentPage: currentPage,
        totalPages: totalPages || 1,
        total: total,
      });
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
      setTickets([]);
      setPagination({
        currentPage: 1,
        totalPages: 1,
        total: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setFilters({ ...filters, search: value });
    setPagination({ ...pagination, currentPage: 1 });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    setPagination({ ...pagination, currentPage: 1 });
  };

  const handlePageChange = (page) => {
    setPagination({ ...pagination, currentPage: page });
  };

  if (loading && tickets.length === 0) {
    return <Loader fullScreen />;
  }

  return (
    <div className="space-y-6 p-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Support Tickets</h1>
          <p className="text-gray-600 mt-1">{pagination.total} total tickets</p>
        </div>
        <Button onClick={() => navigate('/tickets/create')}>
          <Plus className="w-5 h-5 mr-2" />
          Create Ticket
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-card p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search tickets..."
          />
          
          <Select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            placeholder="All Status"
            options={Object.values(TICKET_STATUS).map(status => ({
              value: status,
              label: status,
            }))}
          />
          
          <Select
            name="priority"
            value={filters.priority}
            onChange={handleFilterChange}
            placeholder="All Priorities"
            options={Object.values(TICKET_PRIORITY).map(priority => ({
              value: priority,
              label: priority,
            }))}
          />
          
          <Select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            placeholder="All Categories"
            options={Object.values(TICKET_CATEGORY).map(category => ({
              value: category,
              label: category,
            }))}
          />
        </div>
      </div>

      {/* Ticket List */}
      {tickets.length === 0 ? (
        <EmptyState
          title="No tickets found"
          message="Create your first support ticket to get started."
          action={() => navigate('/tickets/create')}
          actionLabel="Create Ticket"
        />
      ) : (
        <>
          <div className="grid gap-4">
            {tickets.map((ticket) => (
              <TicketCard key={ticket._id} ticket={ticket} />
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default TicketsPage;