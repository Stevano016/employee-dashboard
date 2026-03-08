'use client';

import { useAuth } from '@/hooks/useAuth';
import { LogOut, Bell } from 'lucide-react';

export const Navbar = () => {
  const { logout } = useAuth();

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6">
      <div className="font-semibold text-slate-700">Sistem Manajemen Karyawan</div>
      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full">
          <Bell size={20} />
        </button>
        <button 
          onClick={() => logout()}
          className="flex items-center gap-2 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
        >
          <LogOut size={18} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </header>
  );
};
