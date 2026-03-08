'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function KaryawanDashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'karyawan')) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== 'karyawan') return <div>Loading...</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border">
      <h1 className="text-2xl font-bold mb-4 text-slate-700 font-medium">Dashboard Karyawan</h1>
      <p>Selamat Datang, {user.username}.</p>
    </div>
  );
}
