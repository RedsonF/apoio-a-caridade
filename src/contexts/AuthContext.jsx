import React, { createContext } from 'react';
import authService from 'services/authService';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const { loading, login, logout, role, user } = authService();

  return (
    <AuthContext.Provider
      value={{
        loading,
        role,
        login,
        logout,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
