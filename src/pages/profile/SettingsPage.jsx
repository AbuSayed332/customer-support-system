import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Alert from '../../components/common/Alert';
import authService from '../../services/authService';
import { toast } from 'react-toastify';

const SettingsPage = () => {
  const { user, updateProfile } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileLoading(true);

    try {
      await updateProfile(profileData);
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }

    setPasswordLoading(true);

    try {
      await authService.updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      
      toast.success('Password updated successfully');
    } catch (error) {
      toast.error('Failed to update password');
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

      {/* Profile Settings */}
      <Card>
        <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>
        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <Input
            label="Full Name"
            name="name"
            value={profileData.name}
            onChange={handleProfileChange}
            required
          />
          
          <Input
            label="Email"
            name="email"
            type="email"
            value={profileData.email}
            onChange={handleProfileChange}
            required
          />
          
          <div className="flex justify-end">
            <Button type="submit" loading={profileLoading}>
              Save Changes
            </Button>
          </div>
        </form>
      </Card>

      {/* Password Settings */}
      <Card>
        <h2 className="text-xl font-semibold mb-6">Change Password</h2>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <Input
            label="Current Password"
            name="currentPassword"
            type="password"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
            required
          />
          
          <Input
            label="New Password"
            name="newPassword"
            type="password"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            required
          />
          
          <Input
            label="Confirm New Password"
            name="confirmPassword"
            type="password"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            error={errors.confirmPassword}
            required
          />
          
          <div className="flex justify-end">
            <Button type="submit" loading={passwordLoading}>
              Update Password
            </Button>
          </div>
        </form>
      </Card>

      {/* Appearance Settings */}
      <Card>
        <h2 className="text-xl font-semibold mb-6">Appearance</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Theme</p>
            <p className="text-sm text-gray-600">Choose your preferred theme</p>
          </div>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPage;