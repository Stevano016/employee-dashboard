'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Karyawan, KaryawanWithDetails, CreateKaryawanInput } from '@/types/karyawan.types';
import { Departemen } from '@/types/departemen.types';
import { JamKerja } from '@/types/jamKerja.types';
import { STATUS_OPTIONS } from '@/constants/statusOptions';
import { useKaryawan } from '@/hooks/useKaryawan';
import { useDepartemen } from '@/hooks/useDepartemen';
import { useJamKerja } from '@/hooks/useJamKerja';
import { generateNIK } from '@/lib/utils';

interface KaryawanFormProps {
  initialData?: KaryawanWithDetails;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function KaryawanForm({ initialData, onSuccess, onCancel }: KaryawanFormProps) {
  const { createKaryawan, updateKaryawan } = useKaryawan();
  const { data: departemenList } = useDepartemen();
  const { data: jamKerjaList } = useJamKerja();

  const [formData, setFormData] = useState<Partial<Karyawan>>({
    nama_lengkap: '',
    nik: '',
    jabatan: '',
    tanggal_masuk: new Date().toISOString().split('T')[0],
    status: 'aktif',
    departemen_id: null,
    jam_kerja_id: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        nama_lengkap: initialData.nama_lengkap || '',
        nik: initialData.nik || '',
        jabatan: initialData.jabatan || '',
        tanggal_masuk: initialData.tanggal_masuk?.split('T')[0] || '',
        status: initialData.status || 'aktif',
        departemen_id: initialData.departemen_id || null,
        jam_kerja_id: initialData.jam_kerja_id || null,
      });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const data: CreateKaryawanInput = {
        nama_lengkap: formData.nama_lengkap!,
        nik: formData.nik || generateNIK(),
        jabatan: formData.jabatan!,
        tanggal_masuk: formData.tanggal_masuk!,
        status: formData.status as 'aktif' | 'resign',
        departemen_id: formData.departemen_id || null,
        jam_kerja_id: formData.jam_kerja_id || null,
      };

      if (initialData?.karyawan_id) {
        await updateKaryawan(initialData.karyawan_id, data);
      } else {
        await createKaryawan(data);
      }

      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? 'Edit' : 'Tambah'} Karyawan</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nama_lengkap">Nama Lengkap</Label>
              <Input
                id="nama_lengkap"
                value={formData.nama_lengkap}
                onChange={(e) => setFormData({ ...formData, nama_lengkap: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nik">NIK</Label>
              <Input
                id="nik"
                value={formData.nik}
                onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                placeholder="Auto-generate jika kosong"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jabatan">Jabatan</Label>
              <Input
                id="jabatan"
                value={formData.jabatan}
                onChange={(e) => setFormData({ ...formData, jabatan: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tanggal_masuk">Tanggal Masuk</Label>
              <Input
                id="tanggal_masuk"
                type="date"
                value={formData.tanggal_masuk}
                onChange={(e) => setFormData({ ...formData, tanggal_masuk: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: 'aktif' | 'resign') =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.karyawan.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="departemen">Departemen</Label>
              <Select
                value={formData.departemen_id?.toString() || ''}
                onValueChange={(value) =>
                  setFormData({ ...formData, departemen_id: value ? parseInt(value) : null })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih departemen" />
                </SelectTrigger>
                <SelectContent>
                  {departemenList.map((dept) => (
                    <SelectItem key={dept.departemen_id} value={dept.departemen_id.toString()}>
                      {dept.nama_departemen}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jam_kerja">Jam Kerja</Label>
              <Select
                value={formData.jam_kerja_id?.toString() || ''}
                onValueChange={(value) =>
                  setFormData({ ...formData, jam_kerja_id: value ? parseInt(value) : null })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jam kerja" />
                </SelectTrigger>
                <SelectContent>
                  {jamKerjaList.map((jam) => (
                    <SelectItem key={jam.jam_kerja_id} value={jam.jam_kerja_id.toString()}>
                      {jam.nama_shift} ({jam.hari})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>

        <div className="flex justify-end gap-2 p-4 border-t">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Batal
            </Button>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default KaryawanForm;
