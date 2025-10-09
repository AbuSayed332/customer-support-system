// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Plus } from 'lucide-react';
// import ticketService from '../../services/ticketService';
// import TicketCard from '../../components/tickets/TicketCard';
// import Button from '../../components/common/Button';
// import SearchBar from '../../components/common/SearchBar';
// import Select from '../../components/common/Select';
// import EmptyState from '../../components/common/EmptyState';
// import Loader from '../../components/common/Loader';
// import Pagination from '../../components/common/Pagination';
// import { TICKET_STATUS, TICKET_PRIORITY, TICKET_CATEGORY } from '../../utils/constants';

// const TicketsPage = () => {
//   const navigate = useNavigate();
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     search: '',
//     status: '',
//     priority: '',
//     category: '',
//   });
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     totalPages: 1,
//     total: 0,
//   });

//   useEffect(() => {
//     fetchTickets();
//   }, [filters, pagination.currentPage]);

//   const fetchTickets = async () => {
//     try {
//       setLoading(true);
//       const response = await ticketService.getAll({
//         page: pagination.currentPage,
//         limit: 10,
//         search: filters.search,
//         status: filters.status,
//         priority: filters.priority,
//         category: filters.category,
//       });
      
//       console.log('API Response:', response); // Debug log
      
//       // Handle multiple possible response structures
//       let ticketsData = [];
//       let total = 0;
//       let totalPages = 1;
//       let currentPage = pagination.currentPage;
      
//       if (response.data) {
//         // Structure 1: { data: { tickets: [...], total: 10, ... } }
//         if (response.data.tickets && Array.isArray(response.data.tickets)) {
//           ticketsData = response.data.tickets;
//           total = response.data.total || ticketsData.length;
//           totalPages = response.data.totalPages || Math.ceil(total / 10);
//           currentPage = response.data.currentPage || pagination.currentPage;
//         }
//         // Structure 2: { data: [...] }
//         else if (Array.isArray(response.data)) {
//           ticketsData = response.data;
//           total = response.total || ticketsData.length;
//           totalPages = Math.ceil(total / 10);
//         }
//         // Structure 3: { data: { } } - empty object
//         else {
//           ticketsData = [];
//           total = 0;
//           totalPages = 1;
//         }
//       }
//       // Structure 4: Direct array
//       else if (Array.isArray(response)) {
//         ticketsData = response;
//         total = ticketsData.length;
//         totalPages = Math.ceil(total / 10);
//       }
      
//       setTickets(ticketsData);
//       setPagination({
//         currentPage: currentPage,
//         totalPages: totalPages || 1,
//         total: total,
//       });
//     } catch (error) {
//       console.error('Failed to fetch tickets:', error);
//       setTickets([]);
//       setPagination({
//         currentPage: 1,
//         totalPages: 1,
//         total: 0,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (value) => {
//     setFilters({ ...filters, search: value });
//     setPagination({ ...pagination, currentPage: 1 });
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters({ ...filters, [name]: value });
//     setPagination({ ...pagination, currentPage: 1 });
//   };

//   const handlePageChange = (page) => {
//     setPagination({ ...pagination, currentPage: page });
//   };

//   if (loading && tickets.length === 0) {
//     return <Loader fullScreen />;
//   }

//   return (
//     <div className="space-y-6 p-20">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Support Tickets</h1>
//           <p className="text-gray-600 mt-1">{pagination.total} total tickets</p>
//         </div>
//         <Button onClick={() => navigate('/tickets/create')}>
//           <Plus className="w-5 h-5 mr-2" />
//           Create Ticket
//         </Button>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-lg shadow-card p-6">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <SearchBar
//             onSearch={handleSearch}
//             placeholder="Search tickets..."
//           />
          
//           <Select
//             name="status"
//             value={filters.status}
//             onChange={handleFilterChange}
//             placeholder="All Status"
//             options={Object.values(TICKET_STATUS).map(status => ({
//               value: status,
//               label: status,
//             }))}
//           />
          
//           <Select
//             name="priority"
//             value={filters.priority}
//             onChange={handleFilterChange}
//             placeholder="All Priorities"
//             options={Object.values(TICKET_PRIORITY).map(priority => ({
//               value: priority,
//               label: priority,
//             }))}
//           />
          
//           <Select
//             name="category"
//             value={filters.category}
//             onChange={handleFilterChange}
//             placeholder="All Categories"
//             options={Object.values(TICKET_CATEGORY).map(category => ({
//               value: category,
//               label: category,
//             }))}
//           />
//         </div>
//       </div>

//       {/* Ticket List */}
//       {tickets.length === 0 ? (
//         <EmptyState
//           title="No tickets found"
//           message="Create your first support ticket to get started."
//           action={() => navigate('/tickets/create')}
//           actionLabel="Create Ticket"
//         />
//       ) : (
//         <>
//           <div className="grid gap-4">
//             {tickets.map((ticket) => (
//               <TicketCard key={ticket._id} ticket={ticket} />
//             ))}
//           </div>

//           {pagination.totalPages > 1 && (
//             <Pagination
//               currentPage={pagination.currentPage}
//               totalPages={pagination.totalPages}
//               onPageChange={handlePageChange}
//             />
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default TicketsPage;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Plus, Filter, Ticket as TicketIcon, TrendingUp } from 'lucide-react';
// import ticketService from '../../services/ticketService';
// import TicketCard from '../../components/tickets/TicketCard';
// import Button from '../../components/common/Button';
// import SearchBar from '../../components/common/SearchBar';
// import Select from '../../components/common/Select';
// import EmptyState from '../../components/common/EmptyState';
// import Loader from '../../components/common/Loader';
// import Pagination from '../../components/common/Pagination';
// import { TICKET_STATUS, TICKET_PRIORITY, TICKET_CATEGORY } from '../../utils/constants';

// const TicketsPage = () => {
//   const navigate = useNavigate();
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     search: '',
//     status: '',
//     priority: '',
//     category: '',
//   });
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     totalPages: 1,
//     total: 0,
//   });

//   useEffect(() => {
//     fetchTickets();
//   }, [filters, pagination.currentPage]);

//   const fetchTickets = async () => {
//     try {
//       setLoading(true);
//       const response = await ticketService.getAll({
//         page: pagination.currentPage,
//         limit: 10,
//         search: filters.search,
//         status: filters.status,
//         priority: filters.priority,
//         category: filters.category,
//       });
      
//       console.log('API Response:', response);
      
//       let ticketsData = [];
//       let total = 0;
//       let totalPages = 1;
//       let currentPage = pagination.currentPage;
      
//       if (response.data) {
//         if (response.data.tickets && Array.isArray(response.data.tickets)) {
//           ticketsData = response.data.tickets;
//           total = response.data.total || ticketsData.length;
//           totalPages = response.data.totalPages || Math.ceil(total / 10);
//           currentPage = response.data.currentPage || pagination.currentPage;
//         }
//         else if (Array.isArray(response.data)) {
//           ticketsData = response.data;
//           total = response.total || ticketsData.length;
//           totalPages = Math.ceil(total / 10);
//         }
//         else {
//           ticketsData = [];
//           total = 0;
//           totalPages = 1;
//         }
//       }
//       else if (Array.isArray(response)) {
//         ticketsData = response;
//         total = ticketsData.length;
//         totalPages = Math.ceil(total / 10);
//       }
      
//       setTickets(ticketsData);
//       setPagination({
//         currentPage: currentPage,
//         totalPages: totalPages || 1,
//         total: total,
//       });
//     } catch (error) {
//       console.error('Failed to fetch tickets:', error);
//       setTickets([]);
//       setPagination({
//         currentPage: 1,
//         totalPages: 1,
//         total: 0,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (value) => {
//     setFilters({ ...filters, search: value });
//     setPagination({ ...pagination, currentPage: 1 });
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters({ ...filters, [name]: value });
//     setPagination({ ...pagination, currentPage: 1 });
//   };

//   const handlePageChange = (page) => {
//     setPagination({ ...pagination, currentPage: page });
//   };

//   if (loading && tickets.length === 0) {
//     return <Loader fullScreen />;
//   }

//   const activeFiltersCount = Object.values(filters).filter(v => v).length - (filters.search ? 1 : 0);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-12">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header Section */}
//         <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8">
//           <div className="absolute top-0 right-0 -mt-4 -mr-4 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
//           <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-48 h-48 bg-white opacity-10 rounded-full blur-2xl"></div>
          
//           <div className="relative z-10 flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
//                 <TicketIcon className="w-8 h-8 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
//                   Support Tickets
//                 </h1>
//                 <div className="flex items-center space-x-2 text-blue-100">
//                   <TrendingUp className="w-4 h-4" />
//                   <p className="text-lg">{pagination.total} total tickets</p>
//                 </div>
//               </div>
//             </div>
            
//             <button
//               onClick={() => navigate('/tickets/create')}
//               className="hidden md:flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:scale-105 hover:shadow-xl transition-all duration-300"
//             >
//               <Plus className="w-5 h-5" />
//               <span>Create Ticket</span>
//             </button>
//           </div>
//         </div>

//         {/* Mobile Create Button */}
//         <button
//           onClick={() => navigate('/tickets/create')}
//           className="md:hidden w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
//         >
//           <Plus className="w-5 h-5" />
//           <span>Create New Ticket</span>
//         </button>

//         {/* Filters Section */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center space-x-2">
//               <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
//                 <Filter className="w-5 h-5 text-white" />
//               </div>
//               <h2 className="text-lg font-bold text-gray-900">Filters</h2>
//               {activeFiltersCount > 0 && (
//                 <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
//                   {activeFiltersCount} active
//                 </span>
//               )}
//             </div>
//             {activeFiltersCount > 0 && (
//               <button
//                 onClick={() => setFilters({ search: '', status: '', priority: '', category: '' })}
//                 className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors"
//               >
//                 Clear all
//               </button>
//             )}
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <div className="md:col-span-1">
//               <SearchBar
//                 onSearch={handleSearch}
//                 placeholder="Search tickets..."
//               />
//             </div>
            
//             <Select
//               name="status"
//               value={filters.status}
//               onChange={handleFilterChange}
//               placeholder="All Status"
//               options={Object.values(TICKET_STATUS).map(status => ({
//                 value: status,
//                 label: status,
//               }))}
//             />
            
//             <Select
//               name="priority"
//               value={filters.priority}
//               onChange={handleFilterChange}
//               placeholder="All Priorities"
//               options={Object.values(TICKET_PRIORITY).map(priority => ({
//                 value: priority,
//                 label: priority,
//               }))}
//             />
            
//             <Select
//               name="category"
//               value={filters.category}
//               onChange={handleFilterChange}
//               placeholder="All Categories"
//               options={Object.values(TICKET_CATEGORY).map(category => ({
//                 value: category,
//                 label: category,
//               }))}
//             />
//           </div>
//         </div>

//         {/* Results Summary */}
//         {tickets.length > 0 && (
//           <div className="flex items-center justify-between px-2">
//             <p className="text-sm text-gray-600">
//               Showing <span className="font-semibold text-gray-900">{tickets.length}</span> of{' '}
//               <span className="font-semibold text-gray-900">{pagination.total}</span> tickets
//             </p>
//             {loading && (
//               <div className="flex items-center space-x-2 text-blue-600">
//                 <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//                 <span className="text-sm font-medium">Updating...</span>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Ticket List */}
//         {tickets.length === 0 ? (
//           <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-16">
//             <EmptyState
//               title="No tickets found"
//               message="Create your first support ticket to get started."
//               action={() => navigate('/tickets/create')}
//               actionLabel="Create Ticket"
//             />
//           </div>
//         ) : (
//           <>
//             <div className="grid gap-4">
//               {tickets.map((ticket) => (
//                 <div
//                   key={ticket._id}
//                   className="transform transition-all duration-300 hover:scale-102 hover:shadow-xl"
//                 >
//                   <TicketCard ticket={ticket} />
//                 </div>
//               ))}
//             </div>

//             {pagination.totalPages > 1 && (
//               <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
//                 <Pagination
//                   currentPage={pagination.currentPage}
//                   totalPages={pagination.totalPages}
//                   onPageChange={handlePageChange}
//                 />
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TicketsPage;

// ============================================================================
// FILE: src/pages/tickets/TicketsPage.jsx
// Fixed Tickets Page - Prevents Infinite Loop
// ============================================================================

import React, { useState, useEffect, useCallback, useRef } from 'react';
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
import { toast } from 'react-toastify';

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

  // Use ref to track if we're already fetching
  const isFetchingRef = useRef(false);
  const abortControllerRef = useRef(null);

  // Memoize fetchTickets to prevent recreation on every render
  const fetchTickets = useCallback(async () => {
    // Prevent multiple simultaneous requests
    if (isFetchingRef.current) {
      console.log('⏳ Already fetching, skipping...');
      return;
    }

    // Cancel previous request if exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    try {
      isFetchingRef.current = true;
      setLoading(true);
      
      console.log('🔄 Fetching tickets with params:', {
        page: pagination.currentPage,
        limit: 10,
        ...filters,
      });

      const response = await ticketService.getAll({
        page: pagination.currentPage,
        limit: 10,
        search: filters.search,
        status: filters.status,
        priority: filters.priority,
        category: filters.category,
      });
      
      console.log('✅ API Response:', response);

      if (!response) {
        throw new Error('No response from server');
      }
      
      const ticketData = response.data || [];
      const totalCount = response.total || 0;
      
      setTickets(Array.isArray(ticketData) ? ticketData : []);
      setPagination(prev => ({
        ...prev,
        totalPages: totalCount > 0 ? Math.ceil(totalCount / 10) : 1,
        total: totalCount,
      }));
    } catch (error) {
      if (error.name === 'CanceledError' || error.code === 'ERR_CANCELED') {
        console.log('⚠️ Request was cancelled');
        return;
      }
      
      console.error('❌ Failed to fetch tickets:', error);
      setTickets([]);
      setPagination(prev => ({
        ...prev,
        totalPages: 1,
        total: 0,
      }));
      
      if (error.code !== 'ECONNABORTED') {
        toast.error('Failed to load tickets');
      }
    } finally {
      isFetchingRef.current = false;
      setLoading(false);
    }
  }, [pagination.currentPage, filters]);

  // Fetch tickets when filters or page changes
  useEffect(() => {
    fetchTickets();

    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchTickets]);

  const handleSearch = (value) => {
    setFilters(prev => ({ ...prev, search: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  if (loading && tickets.length === 0) {
    return <Loader fullScreen />;
  }

  return (
    <div className="space-y-6">
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
            options={[
              { value: '', label: 'All Status' },
              ...Object.values(TICKET_STATUS).map(status => ({
                value: status,
                label: status,
              }))
            ]}
          />
          
          <Select
            name="priority"
            value={filters.priority}
            onChange={handleFilterChange}
            placeholder="All Priorities"
            options={[
              { value: '', label: 'All Priorities' },
              ...Object.values(TICKET_PRIORITY).map(priority => ({
                value: priority,
                label: priority,
              }))
            ]}
          />
          
          <Select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            placeholder="All Categories"
            options={[
              { value: '', label: 'All Categories' },
              ...Object.values(TICKET_CATEGORY).map(category => ({
                value: category,
                label: category,
              }))
            ]}
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