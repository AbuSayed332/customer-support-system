import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '../components/layout/MainLayout';
import AuthLayout from '../components/layout/AuthLayout';
import DashboardLayout from '../components/layout/DashboardLayout';

// Route Guards
import ProtectedRoute from '../components/common/ProtectedRoute';
import PrivateRoute from '../components/common/PrivateRoute';

// Public Pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';

// Dashboard Pages
import Dashboard from '../pages/Dashboard';

// Ticket Pages
import TicketsPage from '../pages/tickets/TicketsPage';
import TicketDetailPage from '../pages/tickets/TicketDetailPage';
import CreateTicketPage from '../pages/tickets/CreateTicketPage';

// Chat Pages
import ChatPage from '../pages/chat/ChatPage';

// Profile Pages
import ProfilePage from '../pages/profile/ProfilePage';
import SettingsPage from '../pages/profile/SettingsPage';

// Admin Pages
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import UsersPage from '../pages/admin/user/UsersPage';
import AllTicketsPage from '../pages/admin/tickets/AllTicketsPage';

// Error Pages
import NotFound from '../pages/NotFound';
import Unauthorized from '../pages/Unauthorized';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Tickets */}
        <Route path="/tickets" element={<TicketsPage />} />
        <Route path="/tickets/create" element={<CreateTicketPage />} />
        <Route path="/tickets/:id" element={<TicketDetailPage />} />

        {/* Chat */}
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chat/:ticketId" element={<ChatPage />} />

        {/* Profile */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/settings" element={<SettingsPage />} />

        {/* Admin Routes */}
        <Route element={<PrivateRoute allowedRoles={['admin']} />}>
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/users" element={<UsersPage />} />
          <Route path="/admin/tickets" element={<AllTicketsPage />} />
        </Route>
      </Route>

      {/* Error Routes */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes;