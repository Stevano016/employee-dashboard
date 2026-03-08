'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardCheck, CalendarCheck, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

interface IzinCuti {
  izin_id: number;
  nama_karyawan?: string | null;
  jenis: string;
  tanggal_mulai: string;
  status: string;
}

interface Absensi {
  absensi_id: number;
  nama_karyawan?: string | null;
  status_kehadiran: string;
  waktu_masuk: string | null;
}

export function HRDashboard() {
  const router = useRouter();
  const [izinPending, setIzinPending] = useState<IzinCuti[]>([]);
  const [absensiToday, setAbsensiToday] = useState<Absensi[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHRData = async () => {
      try {
        const [izinRes, absensiRes] = await Promise.all([
          fetch('/api/izin-cuti?status=menunggu', { credentials: 'include' }),
          fetch('/api/absensi', { credentials: 'include' }),
        ]);

        const izinData = await izinRes.json();
        const absensiData = await absensiRes.json();

        const today = new Date().toISOString().split('T')[0];
        const todayAbsensi = absensiData.absensi?.filter(
          (a: { tanggal: string }) => a.tanggal === today
        ) || [];

        setIzinPending(izinData.izinCuti?.slice(0, 5) || []);
        setAbsensiToday(todayAbsensi.slice(0, 5) || []);
      } catch (error) {
        console.error('Failed to fetch HR data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHRData();
  }, []);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      menunggu: 'outline',
      disetujui: 'default',
      ditolak: 'destructive',
      hadir: 'default',
      terlambat: 'secondary',
      sakit: 'secondary',
      izin: 'secondary',
      alpha: 'destructive',
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  if (loading) {
    return <div className="text-center py-8">Memuat data...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Izin Pending</CardTitle>
            <CalendarCheck className="w-8 h-8 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{izinPending.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absensi Hari Ini</CardTitle>
            <ClipboardCheck className="w-8 h-8 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{absensiToday.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kelola Absensi</CardTitle>
            <Clock className="w-8 h-8 text-primary" />
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push(ROUTES.ABSENSI)} className="w-full">
              Buka Halaman Absensi
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Izin Cuti Pending</CardTitle>
          </CardHeader>
          <CardContent>
            {izinPending.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">Tidak ada izin pending</p>
            ) : (
              <div className="space-y-3">
                {izinPending.map((izin) => (
                  <div
                    key={izin.izin_id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{izin.nama_karyawan}</p>
                      <p className="text-sm text-muted-foreground">
                        {izin.jenis} - {new Date(izin.tanggal_mulai).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                    {getStatusBadge(izin.status)}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Absensi Hari Ini</CardTitle>
          </CardHeader>
          <CardContent>
            {absensiToday.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">Belum ada absensi hari ini</p>
            ) : (
              <div className="space-y-3">
                {absensiToday.map((absensi) => (
                  <div
                    key={absensi.absensi_id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{absensi.nama_karyawan}</p>
                      <p className="text-sm text-muted-foreground">
                        Masuk: {absensi.waktu_masuk || '-'}
                      </p>
                    </div>
                    {getStatusBadge(absensi.status_kehadiran)}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default HRDashboard;
