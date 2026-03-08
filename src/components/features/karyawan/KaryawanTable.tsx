'use client';

import { KaryawanWithDetails } from '@/types/karyawan.types';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

export const KaryawanTable = ({ data }: { data: KaryawanWithDetails[] }) => {
  return (
    <div className="bg-white rounded-md border shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead>NIK</TableHead>
            <TableHead>Nama Lengkap</TableHead>
            <TableHead>Jabatan</TableHead>
            <TableHead>Departemen</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-slate-500">
                Tidak ada data karyawan
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={item.karyawan_id}>
                <TableCell className="font-medium">{item.nik}</TableCell>
                <TableCell>{item.nama_lengkap}</TableCell>
                <TableCell>{item.jabatan}</TableCell>
                <TableCell>{item.nama_departemen || '-'}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    item.status === 'aktif' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {item.status}
                  </span>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
