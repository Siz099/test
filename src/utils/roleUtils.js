// Role-based access control utilities

export const USER_ROLES = {
  ADMIN: 'admin',
  PARTNER: 'partner',
  ATTENDEE: 'attendee'
};

export const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

export const getCurrentUserRole = () => {
  const user = getCurrentUser();
  return user?.role?.toLowerCase() || null;
};

export const isAdmin = () => {
  return getCurrentUserRole() === USER_ROLES.ADMIN;
};

export const isPartner = () => {
  return getCurrentUserRole() === USER_ROLES.PARTNER;
};

export const isAttendee = () => {
  return getCurrentUserRole() === USER_ROLES.ATTENDEE;
};

export const hasRole = (requiredRole) => {
  const userRole = getCurrentUserRole();
  return userRole === requiredRole.toLowerCase();
};

export const hasAnyRole = (requiredRoles) => {
  const userRole = getCurrentUserRole();
  return requiredRoles.some(role => role.toLowerCase() === userRole);
};

export const canAccessAdminPanel = () => {
  return isAdmin();
};

export const canAccessPartnerPanel = () => {
  return isPartner();
};

export const canManageVenues = () => {
  return isAdmin() || isPartner();
};

export const canManageUsers = () => {
  return isAdmin();
};

export const canManagePartners = () => {
  return isAdmin();
};

export const getDefaultRedirectPath = () => {
  const userRole = getCurrentUserRole();
  
  switch (userRole) {
    case USER_ROLES.ADMIN:
      return '/admin/dashboard';
    case USER_ROLES.PARTNER:
      return '/partner/dashboard';
    case USER_ROLES.ATTENDEE:
    default:
      return '/home';
  }
};

export const redirectToRoleDashboard = () => {
  const path = getDefaultRedirectPath();
  window.location.href = path;
};