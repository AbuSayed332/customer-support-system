import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Avatar from '../../components/common/Avatar';
import Badge from '../../components/common/Badge';
import { Mail, Calendar, Shield } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Profile</h1>

      <Card>
        <div className="flex items-start space-x-6">
          <Avatar name={user?.name} size="xlarge" />
          
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
              <Badge variant={user?.role === 'admin' ? 'primary' : 'default'}>
                {user?.role}
              </Badge>
            </div>

            <div className="space-y-3 mt-4">
              <div className="flex items-center text-gray-600">
                <Mail className="w-5 h-5 mr-3" />
                <span>{user?.email}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-3" />
                <span>Member since {formatDate(user?.createdAt, 'MMMM yyyy')}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <Shield className="w-5 h-5 mr-3" />
                <span>Account Status: Active</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold mb-4">Account Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-600">Full Name</label>
            <p className="mt-1 text-gray-900">{user?.name}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <p className="mt-1 text-gray-900">{user?.email}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-600">Role</label>
            <p className="mt-1 text-gray-900 capitalize">{user?.role}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-600">Joined</label>
            <p className="mt-1 text-gray-900">{formatDate(user?.createdAt)}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;