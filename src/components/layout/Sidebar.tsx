'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Clock, 
  CalendarCheck, 
  FileText, 
  UserCircle 
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const Sidebar = () => {
  const pathname = usePathname();
  const { user } = useAuth();

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['admin', 'hr', 'karyawan'] },
    { name: 'Karyawan', href: '/karyawan', icon: Users, roles: ['admin', 'hr'] },
    { name: 'Departemen', href: '/departemen', icon: Building2, roles: ['admin'] },
    { name: 'Jam Kerja', href: '/jam-kerja', icon: Clock, roles: ['admin'] },
    { name: 'Absensi', href: '/absensi', icon: CalendarCheck, roles: ['admin', 'hr', 'karyawan'] },
    { name: 'Izin Cuti', href: '/izin-cuti', icon: FileText, roles: ['admin', 'hr', 'karyawan'] },
  ];

  const filteredMenu = menuItems.filter(item => user && item.roles.includes(user.role));

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-4 flex flex-col">
      <div className="text-2xl font-bold mb-8 px-2">EMS Dashboard</div>
      <nav className="flex-1 space-y-1">
        {filteredMenu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
              pathname.startsWith(item.href) 
                ? "bg-blue-600 text-white" 
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            )}
          >
            <item.icon size={20} />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
      {user && (
        <div className="mt-auto p-2 border-t border-slate-700 pt-4">
          <div className="flex items-center gap-3">
            <UserCircle size={32} />
            <div className="overflow-hidden">
              <p className="font-medium truncate">{user.username}</p>
              <p className="text-xs text-slate-400 uppercase">{user.role}</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
