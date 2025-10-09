// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Ticket, MessageSquare, CheckCircle, Clock } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
// import ticketService from '../services/ticketService';
// import Card from '../components/common/Card';
// import Button from '../components/common/Button';
// import Loader from '../components/common/Loader';

// const Dashboard = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [stats, setStats] = useState({
//     total: 0,
//     open: 0,
//     inProgress: 0,
//     resolved: 0,
//   });
//   const [recentTickets, setRecentTickets] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       const response = await ticketService.getAll({ limit: 5 });
      
//       // Handle different response structures
//       const allTickets = response.data?.tickets || response.data || [];
      
//       setRecentTickets(allTickets);
      
//       // Calculate stats
//       setStats({
//         total: allTickets.length,
//         open: allTickets.filter(t => t.status === 'Open').length,
//         inProgress: allTickets.filter(t => t.status === 'In Progress').length,
//         resolved: allTickets.filter(t => t.status === 'Resolved').length,
//       });
//     } catch (error) {
//       console.error('Failed to fetch dashboard data:', error);
//       setRecentTickets([]);
//       setStats({ total: 0, open: 0, inProgress: 0, resolved: 0 });
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <Loader fullScreen />;
//   }

//   return (
//     <div className="space-y-6 p-20">
//       {/* Welcome Section */}
//       <div className="bg-white rounded-lg shadow-card p-6">
//         <h1 className="text-2xl font-bold text-gray-900">
//           Welcome back, {user?.name}!
//         </h1>
//         <p className="text-gray-600 mt-2">
//           Here's what's happening with your support tickets today.
//         </p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <Card>
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Total Tickets</p>
//               <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
//             </div>
//             <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
//               <Ticket className="w-6 h-6 text-blue-600" />
//             </div>
//           </div>
//         </Card>

//         <Card>
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Open</p>
//               <p className="text-3xl font-bold text-gray-900 mt-2">{stats.open}</p>
//             </div>
//             <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
//               <Clock className="w-6 h-6 text-yellow-600" />
//             </div>
//           </div>
//         </Card>

//         <Card>
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">In Progress</p>
//               <p className="text-3xl font-bold text-gray-900 mt-2">{stats.inProgress}</p>
//             </div>
//             <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
//               <MessageSquare className="w-6 h-6 text-orange-600" />
//             </div>
//           </div>
//         </Card>

//         <Card>
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Resolved</p>
//               <p className="text-3xl font-bold text-gray-900 mt-2">{stats.resolved}</p>
//             </div>
//             <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
//               <CheckCircle className="w-6 h-6 text-green-600" />
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* Quick Actions */}
//       <Card>
//         <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
//         <div className="flex flex-wrap gap-4">
//           <Button onClick={() => navigate('/tickets/create')}>
//             Create New Ticket
//           </Button>
//           <Button variant="secondary" onClick={() => navigate('/tickets')}>
//             View All Tickets
//           </Button>
//           <Button variant="secondary" onClick={() => navigate('/chat')}>
//             Open Chat
//           </Button>
//         </div>
//       </Card>

//       {/* Recent Tickets */}
//       <Card>
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-xl font-semibold">Recent Tickets</h2>
//           <Button variant="ghost" onClick={() => navigate('/tickets')}>
//             View All
//           </Button>
//         </div>
        
//         {recentTickets.length === 0 ? (
//           <p className="text-gray-500 text-center py-8">No tickets yet</p>
//         ) : (
//           <div className="space-y-3">
//             {recentTickets.map((ticket) => (
//               <div
//                 key={ticket._id}
//                 className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
//                 onClick={() => navigate(`/tickets/${ticket._id}`)}
//               >
//                 <div>
//                   <h3 className="font-medium text-gray-900">{ticket.subject}</h3>
//                   <p className="text-sm text-gray-500">{ticket.ticketNumber}</p>
//                 </div>
//                 <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                   ticket.status === 'Open' ? 'bg-blue-100 text-blue-800' :
//                   ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
//                   ticket.status === 'Resolved' ? 'bg-green-100 text-green-800' :
//                   'bg-gray-100 text-gray-800'
//                 }`}>
//                   {ticket.status}
//                 </span>
//               </div>
//             ))}
//           </div>
//         )}
//       </Card>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ticket, MessageSquare, CheckCircle, Clock, Plus, ArrowRight, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ticketService from '../services/ticketService';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0,
  });
  const [recentTickets, setRecentTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await ticketService.getAll({ limit: 5 });
      
      const allTickets = response.data?.tickets || response.data || [];
      
      setRecentTickets(allTickets);
      
      setStats({
        total: allTickets.length,
        open: allTickets.filter(t => t.status === 'Open').length,
        inProgress: allTickets.filter(t => t.status === 'In Progress').length,
        resolved: allTickets.filter(t => t.status === 'Resolved').length,
      });
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      setRecentTickets([]);
      setStats({ total: 0, open: 0, inProgress: 0, resolved: 0 });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section with Gradient */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-48 h-48 bg-white opacity-10 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-blue-100 text-lg">
              Here's what's happening with your support tickets today.
            </p>
          </div>
        </div>

        {/* Stats Cards with Hover Effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Total Tickets</p>
                <p className="text-4xl font-bold text-gray-900 mt-3">{stats.total}</p>
                <div className="flex items-center mt-2 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="font-medium">All time</span>
                </div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Ticket className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-yellow-200 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Open</p>
                <p className="text-4xl font-bold text-gray-900 mt-3">{stats.open}</p>
                <div className="flex items-center mt-2 text-sm text-yellow-600">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="font-medium">Awaiting</span>
                </div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-orange-200 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">In Progress</p>
                <p className="text-4xl font-bold text-gray-900 mt-3">{stats.inProgress}</p>
                <div className="flex items-center mt-2 text-sm text-orange-600">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  <span className="font-medium">Active</span>
                </div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-green-200 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Resolved</p>
                <p className="text-4xl font-bold text-gray-900 mt-3">{stats.resolved}</p>
                <div className="flex items-center mt-2 text-sm text-green-600">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  <span className="font-medium">Completed</span>
                </div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions with Modern Design */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-1.5 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-3"></span>
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/tickets/create')}
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <Plus className="w-6 h-6" />
                  </div>
                  <span className="font-semibold text-lg">Create Ticket</span>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
            
            <button
              onClick={() => navigate('/tickets')}
              className="group bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-gray-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Ticket className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="font-semibold text-lg text-gray-900">All Tickets</span>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
            
            <button
              onClick={() => navigate('/chat')}
              className="group bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-gray-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="font-semibold text-lg text-gray-900">Open Chat</span>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>

        {/* Recent Tickets with Enhanced Design */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <span className="w-1.5 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-3"></span>
              Recent Tickets
            </h2>
            <button
              onClick={() => navigate('/tickets')}
              className="text-blue-600 hover:text-blue-700 font-semibold flex items-center group"
            >
              View All
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          {recentTickets.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Ticket className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">No tickets yet</p>
              <p className="text-gray-400 text-sm mt-2">Create your first ticket to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentTickets.map((ticket) => (
                <div
                  key={ticket._id}
                  className="group flex items-center justify-between p-5 border-2 border-gray-100 rounded-xl hover:border-blue-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent cursor-pointer transition-all duration-300 hover:shadow-md"
                  onClick={() => navigate(`/tickets/${ticket._id}`)}
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Ticket className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{ticket.subject}</h3>
                      <p className="text-sm text-gray-500 mt-1">{ticket.ticketNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                      ticket.status === 'Open' ? 'bg-blue-100 text-blue-700' :
                      ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
                      ticket.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {ticket.status}
                    </span>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;