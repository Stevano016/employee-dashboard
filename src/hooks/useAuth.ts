import { useState, useEffect } from 'react';
import { fetcher } from '@/lib/fetcher';
import { AuthPayload } from '@/types/auth.types';
import Cookies from 'js-cookie';

export const useAuth = () => {
  const [user, setUser] = useState<AuthPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    const res = await fetcher<{ user: AuthPayload }>('/api/auth', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    setUser(res.user);
    localStorage.setItem('user', JSON.stringify(res.user));
    return res.user;
  };

  const logout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    setUser(null);
    localStorage.removeItem('user');
    Cookies.remove('token');
  };

  return { user, loading, login, logout };
};
