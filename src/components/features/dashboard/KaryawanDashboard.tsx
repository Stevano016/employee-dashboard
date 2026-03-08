'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarCheck, Clock, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';

interface Absensi {
  absensi_id: number;
  tanggal: string;
  waktu_masuk: string | null;
  waktu_pulang: string | null;
  status_kehadiran: string;
}

interface IzinCuti {
  izin_id: number;
  tanggal_pengajuan: string;
  tanggal_mulai: string;
  tanggal_selesai: string;
  jenis: string;
  status: string;
}

export function KaryawanDashboard() {
  const { user } = useAuth();
  const [absensiSaya, setAbsensiSaya] = useState<Absensi[]>([]);
  const [izinSaya, setIzinSaya] = useState<IzinCuti[]>([]);
  const [jamKerja, setJamKerja] = useState<{ nama_shift: string; jam_masuk: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKaryawanData = async () => {
      if (!user?.id_karyawan) return;

      try {
        const [karyawanRes, absensiRes, izinRes] = await Promise.all([
          fetch(`/api/karyawan/${user.id_karyawan}`, { credentials: 'include' }),
          fetch(`/api/absensi?karyawan_id=${user.id_karyawan}`, { credentials: 'include' }),
          fetch(`/api/izin-cuti?karyawan_id=${user.id_karyawan}`, { credentials: 'include' }),
        ]);

        const karyawanData = await karyawanRes.json();
        const absensiData = await absensiRes.json();
        const izinData = await izinRes.json();

        if (karyawanData.karyawan) {
          setJamKerja({
            nama_shift: karyawanData.karyawan.nama_shift || '-',
            jam_masuk: karyawanData.karyawan.jam_masuk || '-',
          });
        }

        setAbsensiSaya(absensiData.absensi?.slice(0, 5) || []);
        setIzinSaya(izinData.izinCuti?.slice(0, 3) || []);
      } catch (error) {
        console.error('Failed to fetch karyawan data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchKaryawanData();
  }, [user?.id_karyawan]);

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
      {jamKerja && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jam Kerja Anda</CardTitle>
            <Clock className="w-8 h-8 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jamKerja.nama_shift}</div>
            <p className="text-muted-foreground">Masuk: {jamKerja.jam_masuk}</p>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarCheck className="w-5 h-5" />
              Absensi Saya
            </CardTitle>
          </CardHeader>
          <CardContent>
            {absensiSaya.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">Belum ada absensi</p>
            ) : (
              <div className="space-y-3">
                {absensiSaya.map((absensi) => (
                  <div
                    key={absensi.absensi_id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">
                        {new Date(absensi.tanggal).toLocaleDateString('id-ID', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short',
                        })}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Masuk: {absensi.waktu_masuk || '-'} | Pulang: {absensi.waktu_pulang || '-'}
                      </p>
                    </div>
                    {getStatusBadge(absensi.status_kehadiran)}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Status Izin Terakhir
            </CardTitle>
          </CardHeader>
          <CardContent>
            {izinSaya.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">Tidak ada riwayat izin</p>
            ) : (
              <div className="space-y-3">
                {izinSaya.map((izin) => (
                  <div
                    key={izin.izin_id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium capitalize">{izin.jenis}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(izin.tanggal_mulai).toLocaleDateString('id-ID')} -{' '}
                        {new Date(izin.tanggal_selesai).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                    {getStatusBadge(izin.status)}
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

export default KaryawanDashboard;
