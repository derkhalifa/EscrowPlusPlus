import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/me`,
          { withCredentials: true }
        );
        
        if (response.data.user) {
          setCurrentUser(response.data.user);
        }
      } catch (error) {
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  // Login function
  const login = async (username, password) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/login`,
      { username, password },
      { withCredentials: true }
    );
    
    setCurrentUser(response.data.user);
    return response.data;
  };

  // Logout function
  const logout = async () => {
    await axios.post(
      `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/logout`,
      {},
      { withCredentials: true }
    );
    
    setCurrentUser(null);
  };

  // Register function
  const register = async (userData) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/register`,
      userData
    );
    
    return response.data;
  };

  const value = {
    currentUser,
    loading,
    login,
    logout,
    register,
    isAuthenticated: !!currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;