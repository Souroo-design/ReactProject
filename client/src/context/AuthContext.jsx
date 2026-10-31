import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance, { setAccessToken, registerLogoutCallback } from '../api/axiosInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login'); // 'login' or 'register'

  // Helper to open modal
  const openAuthModal = (tab = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleLogoutState = () => {
    setUser(null);
    setAccessToken(null);
  };

  useEffect(() => {
    registerLogoutCallback(handleLogoutState);

    // Try silent refresh on initial mount
    const checkAuthStatus = async () => {
      try {
        const { data } = await axiosInstance.post('/auth/refresh');
        if (data.success && data.accessToken) {
          setAccessToken(data.accessToken);
          setUser(data.user);
        }
      } catch (err) {
        // No valid session cookie found; remains logged out
        handleLogoutState();
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    const { data } = await axiosInstance.post('/auth/login', { email, password });
    if (data.success) {
      setAccessToken(data.accessToken);
      setUser(data.user);
      closeAuthModal();
    }
    return data;
  };

  const registerUser = async (userData) => {
    const { data } = await axiosInstance.post('/auth/register', userData);
    if (data.success) {
      setAccessToken(data.accessToken);
      setUser(data.user);
      closeAuthModal();
    }
    return data;
  };

  const logout = async () => {
    try {
      await axiosInstance.post('/auth/logout');
    } catch (err) {
      console.warn('Logout API failed, clearing local state');
    } finally {
      handleLogoutState();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        registerUser,
        logout,
        isAuthModalOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal,
        setAuthModalTab,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
