import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const LOCAL_STORAGE_KEY = 'currentUser';

const AuthContext = createContext(null);

const SAMPLE_USERS = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'student',
    avatar: 'https://i.pravatar.cc/150?img=1',
    enrolledCourses: ['1', '2', '3'],
    completedLessons: ['1-1', '1-2', '2-1'],
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    role: 'instructor',
    avatar: 'https://i.pravatar.cc/150?img=5',
    courses: ['1', '2'],
  },
];

// Mutable users list acting as mock DB
let users = [...SAMPLE_USERS];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = useCallback((email, password) => {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      const { password, ...secureUser } = user;
      setCurrentUser(secureUser);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(secureUser));
      return { success: true, user: secureUser };
    }

    return {
      success: false,
      error: 'Invalid email or password',
    };
  }, []);

  const register = useCallback((name, email, password, role = 'student') => {
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return {
        success: false,
        error: 'Email already in use',
      };
    }

    const newUser = {
      id: String(users.length + 1),
      name,
      email,
      password,
      role,
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      enrolledCourses: [],
      completedLessons: [],
    };

    users.push(newUser);

    const { password: _, ...secureUser } = newUser;
    setCurrentUser(secureUser);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(secureUser));

    return { success: true, user: secureUser };
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }, []);

  const updateProfile = useCallback((userData) => {
    if (!currentUser) return { success: false, error: 'No user logged in' };

    // Update user in the users array (mock DB)
    users = users.map(user =>
      user.id === currentUser.id ? { ...user, ...userData } : user
    );

    const updatedUser = { ...currentUser, ...userData };
    setCurrentUser(updatedUser);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedUser));

    return { success: true, user: updatedUser };
  }, [currentUser]);

  const resetPassword = useCallback((email) => {
    const user = users.find(user => user.email === email);
    if (!user) {
      return {
        success: false,
        error: 'Email not found',
      };
    }
    // Simulated email sending
    return {
      success: true,
      message: 'Password reset email sent',
    };
  }, []);

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout,
    updateProfile,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  return useContext(AuthContext);
};
