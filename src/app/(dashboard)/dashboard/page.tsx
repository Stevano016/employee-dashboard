'use client';

import { useAuth } from '@/hooks/useAuth';
import { AdminDashboard } from '@/components/features/dashboard/AdminDashboard';

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  if (user.role === 'admin') {
    return <AdminDashboard />;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border">
      <h1 className="text-2xl font-bold mb-4">Selamat Datang, {user.username}</h1>
      <p className="text-slate-600">Peran Anda: <span className="font-semibold uppercase">{user.role}</span></p>
    </div>
  );
}
