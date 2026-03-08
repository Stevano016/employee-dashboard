'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AbsensiWithDetails } from '@/types/absensi.types';

interface AbsensiTableProps {
  data: AbsensiWithDetails[];
}

export function AbsensiTable({ data }: AbsensiTableProps) {
  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      hadir: 'default',
      terlambat: 'secondary',
      izin: 'secondary',
      sakit: 'secondary',
      alpha: 'destructive',
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tanggal</TableHead>
            <TableHead>Nama Karyawan</TableHead>
            <TableHead>Jabatan</TableHead>
            <TableHead>Waktu Masuk</TableHead>
            <TableHead>Waktu Pulang</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Catatan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                Tidak ada data absensi
              </TableCell>
            </TableRow>
          ) : (
            data.map((absensi) => (
              <TableRow key={absensi.absensi_id}>
                <TableCell>
                  {new Date(absensi.tanggal).toLocaleDateString('id-ID')}
                </TableCell>
                <TableCell className="font-medium">{absensi.nama_karyawan || '-'}</TableCell>
                <TableCell>{absensi.jabatan || '-'}</TableCell>
                <TableCell>{absensi.waktu_masuk || '-'}</TableCell>
                <TableCell>{absensi.waktu_pulang || '-'}</TableCell>
                <TableCell>{getStatusBadge(absensi.status_kehadiran)}</TableCell>
                <TableCell className="max-w-xs truncate">{absensi.catatan || '-'}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default AbsensiTable;
