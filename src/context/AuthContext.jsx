import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for persisted session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('saudi_foods_user');
    const token = localStorage.getItem('auth_token');
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('saudi_foods_user');
        localStorage.removeItem('auth_token');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('saudi_foods_user', JSON.stringify(userData));
    localStorage.setItem('auth_token', token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('saudi_foods_user');
    localStorage.removeItem('auth_token');
  };

  const updateUser = (updatedData) => {
    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    localStorage.setItem('saudi_foods_user', JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
