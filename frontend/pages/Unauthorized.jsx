import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldAlert className="w-12 h-12 text-red-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">Access Denied</h1>
        <p className="text-gray-600 mt-4 mb-8 max-w-md mx-auto">
          You don't have permission to access this page. Please contact your administrator
          if you believe this is an error.
        </p>
        <Link to="/dashboard">
          <Button>
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;