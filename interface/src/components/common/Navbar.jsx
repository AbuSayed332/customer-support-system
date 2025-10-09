// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Menu, Bell, LogOut, User, Settings } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import Avatar from './Avatar';

// const Navbar = ({ onMenuClick }) => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const handleLogout = async () => {
//     await logout();
//     navigate('/login');
//   };

//   return (
//     <nav className="bg-white shadow-sm border-b border-gray-200 fixed w-full top-0 z-40">
//       <div className="px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           {/* Left side */}
//           <div className="flex items-center">
//             <button
//               onClick={onMenuClick}
//               className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
//             >
//               <Menu className="w-6 h-6" />
//             </button>
            
//             <Link to="/dashboard" className="flex items-center ml-4 lg:ml-0">
//               <span className="text-xl font-bold text-primary-600 ">
//                 Support System
//               </span>
//             </Link>
//           </div>

//           {/* Right side */}
//           <div className="flex items-center space-x-4">
//             {/* Notifications */}
//             <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 relative">
//               <Bell className="w-6 h-6" />
//               <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//             </button>

//             {/* User menu */}
//             <div className="relative">
//               <button
//                 onClick={() => setDropdownOpen(!dropdownOpen)}
//                 className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
//               >
//                 <Avatar name={user?.name} size="small" />
//                 <span className="hidden md:block text-sm font-medium text-gray-700">
//                   {user?.name}
//                 </span>
//               </button>

//               {/* Dropdown menu */}
//               {dropdownOpen && (
//                 <>
//                   <div
//                     className="fixed inset-0 z-10"
//                     onClick={() => setDropdownOpen(false)}
//                   ></div>
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-20">
//                     <Link
//                       to="/profile"
//                       className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                       onClick={() => setDropdownOpen(false)}
//                     >
//                       <User className="w-4 h-4 mr-3" />
//                       Profile
//                     </Link>
//                     <Link
//                       to="/profile/settings"
//                       className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                       onClick={() => setDropdownOpen(false)}
//                     >
//                       <Settings className="w-4 h-4 mr-3" />
//                       Settings
//                     </Link>
//                     <button
//                       onClick={handleLogout}
//                       className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
//                     >
//                       <LogOut className="w-4 h-4 mr-3" />
//                       Logout
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Bell, LogOut, User, Settings, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Avatar from './Avatar';

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Mock notifications
  const notifications = [
    { id: 1, text: 'New ticket assigned to you', time: '5m ago', unread: true },
    { id: 2, text: 'Ticket #1234 was resolved', time: '1h ago', unread: true },
    { id: 3, text: 'New message in ticket #5678', time: '3h ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 fixed w-full top-0 z-50 backdrop-blur-sm bg-opacity-95">
      {/* Gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2.5 rounded-xl text-gray-600 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600 transition-all duration-300 hover:scale-105"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <Link to="/dashboard" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Support System
                </span>
                <p className="text-xs text-gray-500 -mt-1">Ticket Management</p>
              </div>
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-2">
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2.5 rounded-xl text-gray-600 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600 transition-all duration-300 hover:scale-105 group"
              >
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-gradient-to-br from-red-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse shadow-lg">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications dropdown */}
              {notificationsOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setNotificationsOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-20 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
                      <h3 className="text-white font-bold text-lg">Notifications</h3>
                      <p className="text-blue-100 text-sm">{unreadCount} unread messages</p>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent transition-all cursor-pointer ${
                            notification.unread ? 'bg-blue-50 bg-opacity-50' : ''
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            {notification.unread && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm ${notification.unread ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                                {notification.text}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 bg-gray-50 border-t border-gray-100">
                      <button className="w-full text-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                        View all notifications
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-3 p-2 pr-4 rounded-xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 hover:scale-105 group"
              >
                <div className="relative">
                  <Avatar name={user?.name} size="small" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                </div>
                <div className="hidden md:block text-left">
                  <span className="block text-sm font-semibold text-gray-900">
                    {user?.name}
                  </span>
                  <span className="block text-xs text-gray-500 capitalize">
                    {user?.role}
                  </span>
                </div>
              </button>

              {/* Dropdown menu */}
              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setDropdownOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-20 overflow-hidden">
                    {/* User info header */}
                    <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-br from-blue-50 to-indigo-50">
                      <p className="text-sm font-bold text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-600">{user?.email}</p>
                    </div>

                    {/* Menu items */}
                    <div className="py-2">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent transition-all group"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-medium">Profile</span>
                      </Link>
                      
                      <Link
                        to="/profile/settings"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-transparent transition-all group"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                          <Settings className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="font-medium">Settings</span>
                      </Link>
                    </div>

                    {/* Logout button */}
                    <div className="border-t border-gray-100 pt-2 pb-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-transparent transition-all group"
                      >
                        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                          <LogOut className="w-4 h-4 text-red-600" />
                        </div>
                        <span className="font-semibold">Logout</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;