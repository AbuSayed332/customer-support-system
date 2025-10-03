import React, { useState, useEffect } from 'react';
import { UserPlus, Search, Filter, Edit, Trash2, Ban, CheckCircle } from 'lucide-react';
import userService from '../../../services/userService';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import Select from '../../../components/common/Select';
import Badge from '../../../components/common/Badge';
// import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../../components/common/ConfirmDialog';
import Pagination from '../../../components/common/Pagination';
import Loader from '../../../components/common/Loader';
import Avatar from '../../../components/common/Avatar';
import { formatDate } from '../../../utils/formatters';
import { toast } from 'react-toastify';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [pagination.currentPage, searchTerm, roleFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAll({
        page: pagination.currentPage,
        limit: 10,
        search: searchTerm,
        role: roleFilter,
      });
      
      setUsers(response.data || []);
      setPagination({
        currentPage: pagination.currentPage,
        totalPages: Math.ceil(response.total / 10),
        total: response.total,
      });
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivate = async (userId) => {
    try {
      await userService.deactivate(userId);
      toast.success('User deactivated');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to deactivate user');
    }
  };

  const handleActivate = async (userId) => {
    try {
      await userService.activate(userId);
      toast.success('User activated');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to activate user');
    }
  };

  const handleDelete = async () => {
    try {
      await userService.delete(selectedUser._id);
      toast.success('User deleted');
      setDeleteDialogOpen(false);
      fetchUsers();
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  if (loading && users.length === 0) {
    return <Loader fullScreen />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
          <p className="text-gray-600 mt-1">{pagination.total} total users</p>
        </div>
        <Button>
          <UserPlus className="w-5 h-5 mr-2" />
          Add User
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            placeholder="All Roles"
            options={[
              { value: 'admin', label: 'Admin' },
              { value: 'customer', label: 'Customer' },
            ]}
          />
        </div>
      </Card>

      {/* Users Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">User</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Role</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Joined</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <Avatar name={user.name} size="small" />
                      <span className="font-medium text-gray-900">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{user.email}</td>
                  <td className="py-3 px-4">
                    <Badge variant={user.role === 'admin' ? 'primary' : 'default'}>
                      {user.role}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={user.isActive ? 'success' : 'danger'}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{formatDate(user.createdAt)}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setEditModalOpen(true);
                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                      {user.isActive ? (
                        <button
                          onClick={() => handleDeactivate(user._id)}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                          title="Deactivate"
                        >
                          <Ban className="w-4 h-4 text-orange-600" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleActivate(user._id)}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                          title="Activate"
                        >
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setDeleteDialogOpen(true);
                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {pagination.totalPages > 1 && (
          <div className="mt-4">
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={(page) => setPagination({ ...pagination, currentPage: page })}
            />
          </div>
        )}
      </Card>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete User"
        message={`Are you sure you want to delete ${selectedUser?.name}? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
};

export default UsersPage;