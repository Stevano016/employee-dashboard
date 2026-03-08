'use client';

import { useKaryawan } from '@/hooks/useKaryawan';
import { Users, Building2, UserPlus, CalendarDays } from 'lucide-react';

export const AdminDashboard = () => {
  const { data } = useKaryawan();

  const karyawan = Array.isArray(data) ? data : [];

  const stats = [
    { name: 'Total Karyawan', value: karyawan.length, icon: Users, color: 'bg-blue-500' },
    { name: 'Karyawan Aktif', value: karyawan.filter(k => k.status === 'aktif').length, icon: UserPlus, color: 'bg-green-500' },
    { name: 'Total Departemen', value: new Set(karyawan.map(k => k.departemen_id)).size, icon: Building2, color: 'bg-purple-500' },
    { name: 'Absensi Hari Ini', value: '10/12', icon: CalendarDays, color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 flex items-center gap-4">
            <div className={`${stat.color} p-3 rounded-lg text-white`}>
              <stat.icon size={24} />
            </div>

            <div>
              <p className="text-sm text-slate-500 font-medium">{stat.name}</p>
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4 text-slate-700 font-medium">
          Karyawan Terbaru
        </h2>
      </div>
    </div>
  );
};