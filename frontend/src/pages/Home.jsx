import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket, MessageSquare, Users, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary-600">Support System</h1>
            <div className="space-x-4">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-6 py-2 text-primary-600 hover:text-primary-700"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Efficient Customer Support Made Easy
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Manage support tickets, communicate with customers in real-time, and provide
            exceptional service with our comprehensive support system.
          </p>
          <Link
            to={isAuthenticated ? '/dashboard' : '/register'}
            className="inline-flex items-center px-8 py-3 bg-primary-600 text-white text-lg rounded-lg hover:bg-primary-700"
          >
            Get Started
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white rounded-lg shadow-card p-8">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <Ticket className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Ticket Management</h3>
            <p className="text-gray-600">
              Create, track, and manage support tickets with ease. Set priorities and
              categories for efficient handling.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-card p-8">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time Chat</h3>
            <p className="text-gray-600">
              Communicate instantly with customers through integrated real-time chat
              functionality.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-card p-8">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
            <p className="text-gray-600">
              Assign tickets to team members, track progress, and collaborate effectively
              to resolve issues faster.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;