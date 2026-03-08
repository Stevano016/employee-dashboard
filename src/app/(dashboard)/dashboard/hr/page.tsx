'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HRDashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'hr')) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== 'hr') return <div>Loading...</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border">
      <h1 className="text-2xl font-bold mb-4 text-slate-700 font-medium">HR Dashboard</h1>
      <p>Selamat Datang di Panel HR.</p>
    </div>
  );
}
