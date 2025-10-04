export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

export const TICKET_STATUS = {
  OPEN: 'Open',
  IN_PROGRESS: 'In Progress',
  RESOLVED: 'Resolved',
  CLOSED: 'Closed',
};

export const TICKET_PRIORITY = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  URGENT: 'Urgent',
};

export const TICKET_CATEGORY = {
  TECHNICAL_SUPPORT: 'Technical Support',
  BILLING: 'Billing',
  ACCOUNT: 'Account',
  FEATURE_REQUEST: 'Feature Request',
  BUG_REPORT: 'Bug Report',
  GENERAL_INQUIRY: 'General Inquiry',
  OTHER: 'Other',
};

export const USER_ROLES = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
};

export const STATUS_COLORS = {
  [TICKET_STATUS.OPEN]: 'blue',
  [TICKET_STATUS.IN_PROGRESS]: 'yellow',
  [TICKET_STATUS.RESOLVED]: 'green',
  [TICKET_STATUS.CLOSED]: 'gray',
};

export const PRIORITY_COLORS = {
  [TICKET_PRIORITY.LOW]: 'gray',
  [TICKET_PRIORITY.MEDIUM]: 'blue',
  [TICKET_PRIORITY.HIGH]: 'orange',
  [TICKET_PRIORITY.URGENT]: 'red',
};

export const MAX_FILE_SIZE = parseInt(import.meta.env.VITE_MAX_FILE_SIZE) || 5242880; // 5MB
export const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
];

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  TICKETS: '/tickets',
  TICKETS_CREATE: '/tickets/create',
  TICKET_DETAIL: (id) => `/tickets/${id}`,
  CHAT: '/chat',
  CHAT_TICKET: (id) => `/chat/${id}`,
  PROFILE: '/profile',
  SETTINGS: '/profile/settings',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_USERS: '/admin/users',
  ADMIN_TICKETS: '/admin/tickets',
};

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: parseInt(import.meta.env.VITE_DEFAULT_PAGE_SIZE) || 10,
  MAX_LIMIT: parseInt(import.meta.env.VITE_MAX_PAGE_SIZE) || 100,
};