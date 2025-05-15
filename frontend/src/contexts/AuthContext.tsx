import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

type User = {
  id: string;
  email: string;
  name: string;
  image?: string;
  isGuest?: boolean;
};

type AuthResponse = {
  token: string;
  user: User;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  loginWithOAuth: (provider: 'google' | 'github') => void;
  loginAsGuest: () => Promise<void>;
  isDemoMode: boolean;
};

// Check if we're in demo mode (no backend available)
const isDemoMode = () => {
  // If we're in development, check if localhost:5000 is available
  if (import.meta.env.DEV) {
    return false; // In development, assume backend is available
  }
  // In production, check if API_URL is set
  return !import.meta.env.VITE_API_URL;
};

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: React.ReactNode;
  navigate: (path: string) => void;
};

export function AuthProvider({ children, navigate }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      if (!demoMode) {
        fetchUser(storedToken);
      } else {
        // In demo mode, just set a guest user
        setUser({
          id: 'demo-user',
          email: 'guest@demo.com',
          name: 'Demo User',
          isGuest: true
        });
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [demoMode]);

  const fetchUser = async (token: string) => {
    try {
      const response = await axios.get<User>(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
      console.log('fetchUser', response.data);
    } catch (error) {
      // If we get a network error, switch to demo mode
      if (error && typeof error === 'object' && 'code' in error && error.code === 'ERR_NETWORK') {
        setDemoMode(true);
        setUser({
          id: 'demo-user',
          email: 'guest@demo.com',
          name: 'Demo User',
          isGuest: true
        });
      } else {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    if (demoMode) {
      return loginAsGuest();
    }

    try {
      setLoading(true);
      setError(null);
      const response = await axios.post<AuthResponse>(`${API_URL}/api/auth/login`, {
        email,
        password
      });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
    } catch (error) {
      if (error && typeof error === 'object' && 'code' in error && error.code === 'ERR_NETWORK') {
        setDemoMode(true);
        return loginAsGuest();
      }
      setError('Login failed');
      throw error;
    } finally {
      setLoading(false);
      navigate('/'); // Redirect to dashboard after user login

    }
  };

  const register = async (email: string, password: string, name: string) => {
    if (demoMode) {
      return loginAsGuest();
    }

    try {
      setLoading(true);
      setError(null);
      const response = await axios.post<AuthResponse>(`${API_URL}/api/auth/register`, {
        email,
        password,
        name
      });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
      navigate('/'); // Redirect to dashboard after user login

    } catch (error) {
      if (error && typeof error === 'object' && 'code' in error && error.code === 'ERR_NETWORK') {
        setDemoMode(true);
        return loginAsGuest();
      }
      setError('Registration failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginAsGuest = async () => {
    // If we're already in demo mode or if we detect a network error, set up demo user
    if (demoMode || !API_URL) {
      const guestUser: User = {
        id: 'demo-user',
        email: 'guest@demo.com',
        name: 'Demo User',
        isGuest: true
      };
      setUser(guestUser);
      setToken('demo-token');
      localStorage.setItem('token', 'demo-token');
      setDemoMode(true);
      setLoading(false);
      navigate('/'); // Redirect to dashboard after guest login
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await axios.post<AuthResponse>(`${API_URL}/api/auth/guest`);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
      navigate('/'); // Redirect to dashboard after successful guest login
    } catch (error) {
      if (error && typeof error === 'object' && 'code' in error && error.code === 'ERR_NETWORK') {
        // Instead of recursive call, directly set up demo user
        const guestUser: User = {
          id: 'demo-user',
          email: 'guest@demo.com',
          name: 'Demo User',
          isGuest: true
        };
        setUser(guestUser);
        setToken('demo-token');
        localStorage.setItem('token', 'demo-token');
        setDemoMode(true);
        navigate('/'); // Redirect to dashboard after demo mode setup
      } else {
        setError('Guest login failed');
        throw error;
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const loginWithOAuth = (provider: 'google' | 'github') => {
    if (demoMode) {
      return loginAsGuest();
    }
    window.location.href = `${API_URL}/api/auth/${provider}`;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        login,
        register,
        logout,
        loginWithOAuth,
        loginAsGuest,
        isDemoMode: demoMode
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const test = useContext(AuthContext);

  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 