import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // TEMPORARY mock state — will be replaced with real login/register
  // API calls once the backend exists (Step 5).
  const [user, setUser] = useState(null);

  function mockLogin(email) {
    const isAdmin = email.includes('admin');
    setUser({ name: isAdmin ? 'Admin User' : 'Test User', email, role: isAdmin ? 'admin' : 'user' });
  }

  function logout() {
    setUser(null);
  }

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, mockLogin, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}