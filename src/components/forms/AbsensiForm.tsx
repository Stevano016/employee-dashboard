'use client';

import { useState } from 'react';
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
import { CreateAbsensiInput } from '@/types/absensi.types';
import { STATUS_OPTIONS } from '@/constants/statusOptions';
import { KaryawanWithDetails } from '@/types/karyawan.types';

interface AbsensiFormProps {
  karyawanList: KaryawanWithDetails[];
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function AbsensiForm({ karyawanList, onSuccess, onCancel }: AbsensiFormProps) {
  const [formData, setFormData] = useState<CreateAbsensiInput>({
    karyawan_id: 0,
    tanggal: new Date().toISOString().split('T')[0],
    waktu_masuk: '',
    waktu_pulang: '',
    status_kehadiran: 'hadir',
    catatan: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/absensi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Gagal menyimpan absensi');
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
        <CardTitle>Input Absensi</CardTitle>
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
              <Label htmlFor="karyawan_id">Karyawan</Label>
              <Select
                value={formData.karyawan_id.toString()}
                onValueChange={(value) =>
                  setFormData({ ...formData, karyawan_id: parseInt(value) })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih karyawan" />
                </SelectTrigger>
                <SelectContent>
                  {karyawanList
                    .filter((k) => k.status === 'aktif')
                    .map((karyawan) => (
                      <SelectItem
                        key={karyawan.karyawan_id}
                        value={karyawan.karyawan_id.toString()}
                      >
                        {karyawan.nama_lengkap}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tanggal">Tanggal</Label>
              <Input
                id="tanggal"
                type="date"
                value={formData.tanggal}
                onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="waktu_masuk">Waktu Masuk</Label>
              <Input
                id="waktu_masuk"
                type="time"
                value={formData.waktu_masuk || ''}
                onChange={(e) => setFormData({ ...formData, waktu_masuk: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="waktu_pulang">Waktu Pulang</Label>
              <Input
                id="waktu_pulang"
                type="time"
                value={formData.waktu_pulang || ''}
                onChange={(e) => setFormData({ ...formData, waktu_pulang: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status_kehadiran">Status Kehadiran</Label>
              <Select
                value={formData.status_kehadiran}
                onValueChange={(value: CreateAbsensiInput['status_kehadiran']) =>
                  setFormData({ ...formData, status_kehadiran: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.kehadiran.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="catatan">Catatan</Label>
              <Input
                id="catatan"
                value={formData.catatan || ''}
                onChange={(e) => setFormData({ ...formData, catatan: e.target.value })}
                placeholder="Opsional"
              />
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

export default AbsensiForm;
