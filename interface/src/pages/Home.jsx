// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Ticket, MessageSquare, Users, ArrowRight } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';

// const Home = () => {
//   const { isAuthenticated } = useAuth();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
//       {/* Header */}
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center justify-between">
//             <h1 className="text-2xl font-bold text-primary-600">Support System</h1>
//             <div className="space-x-4">
//               {isAuthenticated ? (
//                 <Link
//                   to="/dashboard"
//                   className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
//                 >
//                   Dashboard
//                 </Link>
//               ) : (
//                 <>
//                   <Link
//                     to="/login"
//                     className="px-6 py-2 text-primary-600 hover:text-primary-700"
//                   >
//                     Login
//                   </Link>
//                   <Link
//                     to="/register"
//                     className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
//                   >
//                     Get Started
//                   </Link>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//         <div className="text-center">
//           <h1 className="text-5xl font-bold text-gray-900 mb-6">
//             Efficient Customer Support Made Easy
//           </h1>
//           <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
//             Manage support tickets, communicate with customers in real-time, and provide
//             exceptional service with our comprehensive support system.
//           </p>
//           <Link
//             to={isAuthenticated ? '/dashboard' : '/register'}
//             className="inline-flex items-center px-8 py-3 bg-primary-600 text-white text-lg rounded-lg hover:bg-primary-700"
//           >
//             Get Started
//             <ArrowRight className="ml-2 w-5 h-5" />
//           </Link>
//         </div>

//         {/* Features */}
//         <div className="grid md:grid-cols-3 gap-8 mt-20">
//           <div className="bg-white rounded-lg shadow-card p-8">
//             <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
//               <Ticket className="w-6 h-6 text-primary-600" />
//             </div>
//             <h3 className="text-xl font-semibold mb-2">Ticket Management</h3>
//             <p className="text-gray-600">
//               Create, track, and manage support tickets with ease. Set priorities and
//               categories for efficient handling.
//             </p>
//           </div>

//           <div className="bg-white rounded-lg shadow-card p-8">
//             <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
//               <MessageSquare className="w-6 h-6 text-primary-600" />
//             </div>
//             <h3 className="text-xl font-semibold mb-2">Real-time Chat</h3>
//             <p className="text-gray-600">
//               Communicate instantly with customers through integrated real-time chat
//               functionality.
//             </p>
//           </div>

//           <div className="bg-white rounded-lg shadow-card p-8">
//             <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
//               <Users className="w-6 h-6 text-primary-600" />
//             </div>
//             <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
//             <p className="text-gray-600">
//               Assign tickets to team members, track progress, and collaborate effectively
//               to resolve issues faster.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket, MessageSquare, Users, ArrowRight, CheckCircle, Zap, Shield, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                <Ticket className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                SupportHub
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="px-6 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-6 py-2.5 text-primary-600 hover:text-primary-700 font-medium transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-6 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full mb-6">
              <Zap className="w-4 h-4 text-primary-600 mr-2" />
              <span className="text-sm font-medium text-primary-700">Powerful Support Platform</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
              Customer Support
              <br />
              <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Transform your customer support with real-time chat, smart ticket management, 
              and powerful collaboration tools. All in one beautiful platform.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link
                to={isAuthenticated ? '/dashboard' : '/register'}
                className="group px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-lg font-medium rounded-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200 flex items-center"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 bg-white text-gray-700 text-lg font-medium rounded-xl border-2 border-gray-200 hover:border-primary-300 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
              >
                Watch Demo
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                No credit card required
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                Free forever plan
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                Setup in 2 minutes
              </div>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-purple-400 rounded-2xl blur-3xl opacity-20"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <Ticket className="w-20 h-20 text-primary-400 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">Dashboard Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to make customer support effortless and efficient
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 border border-gray-100 hover:border-primary-200 transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Ticket className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Smart Ticket Management</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Organize, prioritize, and track support tickets with intelligent categorization 
                and status workflows. Never lose track of customer issues.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  Auto-assign tickets
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  Priority levels
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  File attachments
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 border border-gray-100 hover:border-primary-200 transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Real-time Chat</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Instant communication with customers through integrated WebSocket chat. 
                See typing indicators and online status in real-time.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  Instant messaging
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  Typing indicators
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  Read receipts
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 border border-gray-100 hover:border-primary-200 transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Team Collaboration</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Empower your support team with role-based access, ticket assignment, 
                and internal notes for seamless collaboration.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  Role management
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  Internal notes
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  Activity tracking
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-600 to-purple-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">99.9%</div>
              <div className="text-primary-100">Uptime</div>
            </div>
            <div className="text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">&lt;200ms</div>
              <div className="text-primary-100">Response Time</div>
            </div>
            <div className="text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <div className="text-primary-100">Support</div>
            </div>
            <div className="text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">100%</div>
              <div className="text-primary-100">Secure</div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why teams love SupportHub
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                    <Zap className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
                    <p className="text-gray-600">
                      Built for speed with modern technology. Your team and customers will love the instant responses.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Enterprise Security</h3>
                    <p className="text-gray-600">
                      Bank-level encryption, secure authentication, and compliance with industry standards.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Save Time</h3>
                    <p className="text-gray-600">
                      Reduce response time by 60% with smart automation and real-time collaboration tools.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-purple-400 rounded-2xl blur-3xl opacity-20"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl p-8">
                <div className="aspect-square bg-gradient-to-br from-primary-50 to-purple-50 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-32 h-32 text-primary-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to transform your support?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Join thousands of teams already using SupportHub to deliver exceptional customer service.
          </p>
          <Link
            to={isAuthenticated ? '/dashboard' : '/register'}
            className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-lg font-medium rounded-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200"
          >
            Start Free Trial
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
              <Ticket className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">SupportHub</span>
          </div>
          <p className="text-gray-400 mb-4">
            The all-in-one customer support platform
          </p>
          <p className="text-gray-500 text-sm">
            © 2024 SupportHub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
