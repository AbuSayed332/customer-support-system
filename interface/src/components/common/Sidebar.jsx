// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { 
//   LayoutDashboard, 
//   Ticket, 
//   MessageSquare, 
//   Users, 
//   X 
// } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';

// const Sidebar = ({ isOpen, onClose }) => {
//   const location = useLocation();
//   const { user } = useAuth();

//   const navItems = [
//     {
//       name: 'Dashboard',
//       path: '/dashboard',
//       icon: LayoutDashboard,
//       roles: ['admin', 'customer'],
//     },
//     {
//       name: 'Tickets',
//       path: '/tickets',
//       icon: Ticket,
//       roles: ['admin', 'customer'],
//     },
//     {
//       name: 'Chat',
//       path: '/chat',
//       icon: MessageSquare,
//       roles: ['admin', 'customer'],
//     },
//     {
//       name: 'Users',
//       path: '/admin/users',
//       icon: Users,
//       roles: ['admin'],
//     },
//   ];

//   const filteredItems = navItems.filter((item) =>
//     item.roles.includes(user?.role)
//   );

//   const isActive = (path) => location.pathname === path;

//   return (
//     <>
//       {/* Mobile overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40 lg:hidden"
//           onClick={onClose}
//         ></div>
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 transition-transform duration-300 lg:translate-x-0 ${
//           isOpen ? 'translate-x-0' : '-translate-x-full'
//         }`}
//       >
//         <div className="flex items-center justify-between p-4 lg:hidden">
//           <span className="text-lg font-semibold">Menu</span>
//           <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         <nav className="p-4 space-y-1">
//           {filteredItems.map((item) => {
//             const Icon = item.icon;
//             return (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 onClick={onClose}
//                 className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
//                   isActive(item.path)
//                     ? 'bg-primary-50 text-primary-600'
//                     : 'text-gray-700 hover:bg-gray-100'
//                 }`}
//               >
//                 <Icon className="w-5 h-5 mr-3" />
//                 <span className="font-medium">{item.name}</span>
//               </Link>
//             );
//           })}
//         </nav>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Ticket, 
  MessageSquare, 
  Users, 
  X,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
      roles: ['admin', 'customer'],
      gradient: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      name: 'Tickets',
      path: '/tickets',
      icon: Ticket,
      roles: ['admin', 'customer'],
      gradient: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      name: 'Chat',
      path: '/chat',
      icon: MessageSquare,
      roles: ['admin', 'customer'],
      gradient: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      name: 'Users',
      path: '/admin/users',
      icon: Users,
      roles: ['admin'],
      gradient: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
    },
  ];

  const filteredItems = navItems.filter((item) =>
    item.roles.includes(user?.role)
  );

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile overlay with blur effect */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar with gradient accent */}
      <aside
        className={`fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 shadow-xl transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Decorative gradient bar at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

        {/* Mobile header */}
        <div className="flex items-center justify-between p-5 lg:hidden border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">Menu</span>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* User info card */}
        <div className="p-4 m-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="text-white font-bold text-lg">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold truncate">{user?.name}</p>
              <p className="text-blue-100 text-xs capitalize">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-3 py-2 space-y-1 overflow-y-auto h-[calc(100%-180px)]">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`group relative flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 ${
                  active
                    ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg scale-105`
                    : 'text-gray-700 hover:bg-gray-100 hover:scale-102'
                }`}
              >
                {/* Active indicator */}
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
                )}

                {/* Icon with background */}
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 transition-all duration-300 ${
                  active 
                    ? 'bg-white bg-opacity-20' 
                    : `${item.bgColor} group-hover:scale-110`
                }`}>
                  <Icon className={`w-5 h-5 ${active ? 'text-white' : item.textColor}`} />
                </div>

                {/* Label */}
                <span className={`font-semibold flex-1 ${active ? 'text-white' : 'text-gray-700'}`}>
                  {item.name}
                </span>

                {/* Arrow indicator */}
                <ChevronRight className={`w-4 h-4 transition-all duration-300 ${
                  active 
                    ? 'text-white opacity-100 translate-x-0' 
                    : 'text-gray-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                }`} />

                {/* Hover glow effect */}
                {!active && (
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom decoration */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;