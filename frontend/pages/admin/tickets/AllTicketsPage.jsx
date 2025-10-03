import React, { useState, useEffect } from 'react';
import { Filter, Download } from 'lucide-react';
import ticketService from '../../../services/ticketService';
import userService from '../../../services/userService';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import Select from '../../../components/common/Select';
import SearchBar from '../../../components/common/SearchBar';
import TicketCard from '../../../components/tickets/TicketCard';
import Pagination from '../../../components/common/Pagination';
import Loader from '../../../components/common/Loader';
import { TICKET_STATUS, TICKET_PRIORITY, TICKET_CATEGORY } from '../../../utils/constants';
import { toast } from 'react-toastify';

const AllTicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
    category: '',
    assignedTo: '',
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [filters, pagination.currentPage]);

  const fetchAdmins = async () => {
    try {
      const response = await userService.getAdmins();
      setAdmins(response.data || []);
    } catch (error) {
      console.error('Failed to fetch admins:', error);
    }
  };

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const response = await ticketService.getAll({
        page: pagination.currentPage,
        limit: 10,
        ...filters,
      });
      
      setTickets(response.data || []);
      setPagination({
        currentPage: pagination.currentPage,
        totalPages: Math.ceil(response.total / 10),
        total: response.total,
      });
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    setPagination({ ...pagination, currentPage: 1 });
  };

  const handleSearch = (value) => {
    setFilters({ ...filters, search: value });
    setPagination({ ...pagination, currentPage: 1 });
  };

  const handleExport = () => {
    toast.info('Export functionality coming soon');
  };

  if (loading && tickets.length === 0) {
    return <Loader fullScreen />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Tickets</h1>
          <p className="text-gray-600 mt-1">{pagination.total} total tickets</p>
        </div>
        <Button variant="secondary" onClick={handleExport}>
          <Download className="w-5 h-5 mr-2" />
          Export
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
          
          <Select
            name="assignedTo"
            value={filters.assignedTo}
            onChange={handleFilterChange}
            placeholder="All Admins"
            options={admins.map(admin => ({
              value: admin._id,
              label: admin.name,
            }))}
          />
        </div>
      </Card>

      {/* Tickets List */}
      <div className="grid gap-4">
        {tickets.map((ticket) => (
          <TicketCard key={ticket._id} ticket={ticket} />
        ))}
      </div>

      {pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={(page) => setPagination({ ...pagination, currentPage: page })}
        />
      )}
    </div>
  );
};

export default AllTicketsPage;