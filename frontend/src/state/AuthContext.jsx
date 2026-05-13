import { createContext, useContext, useState, useEffect } from 'react';

const Ctx = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('sf_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { localStorage.removeItem('sf_user'); }
    }
    setLoading(false);
  }, []);

  const login  = (u) => { setUser(u); localStorage.setItem('sf_user', JSON.stringify(u)); };
  const logout = ()  => { setUser(null); localStorage.removeItem('sf_user'); };

  return <Ctx.Provider value={{ user, loading, login, logout }}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);
