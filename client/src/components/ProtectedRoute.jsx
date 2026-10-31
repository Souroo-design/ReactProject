import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading, openAuthModal } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    // Open auth modal and redirect to home if not logged in
    openAuthModal('login');
    return <Navigate to="/" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return (
      <div className="max-w-xl mx-auto my-20 p-8 glass-card rounded-3xl text-center space-y-4">
        <h2 className="text-2xl font-bold text-rose-500">Access Restricted</h2>
        <p className="text-slate-600 dark:text-slate-300">
          Your account role (<span className="font-semibold uppercase">{user.role}</span>) does not have permission to view this section.
        </p>
      </div>
    );
  }

  return children;
};
