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
import { CreateIzinCutiInput } from '@/types/izinCuti.types';
import { JENIS_IZIN_OPTIONS } from '@/constants/statusOptions';

interface IzinCutiFormProps {
  karyawanId?: number;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function IzinCutiForm({ karyawanId, onSuccess, onCancel }: IzinCutiFormProps) {
  const [formData, setFormData] = useState<CreateIzinCutiInput>({
    karyawan_id: karyawanId || 0,
    tanggal_mulai: new Date().toISOString().split('T')[0],
    tanggal_selesai: new Date().toISOString().split('T')[0],
    jenis: 'cuti',
    alasan: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/izin-cuti', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Gagal mengajukan izin cuti');
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
        <CardTitle>Ajukan Izin Cuti</CardTitle>
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
              <Label htmlFor="jenis">Jenis Izin</Label>
              <Select
                value={formData.jenis}
                onValueChange={(value: string) =>
                  setFormData({ ...formData, jenis: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jenis izin" />
                </SelectTrigger>
                <SelectContent>
                  {JENIS_IZIN_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tanggal_mulai">Tanggal Mulai</Label>
              <Input
                id="tanggal_mulai"
                type="date"
                value={formData.tanggal_mulai}
                onChange={(e) => setFormData({ ...formData, tanggal_mulai: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tanggal_selesai">Tanggal Selesai</Label>
              <Input
                id="tanggal_selesai"
                type="date"
                value={formData.tanggal_selesai}
                onChange={(e) => setFormData({ ...formData, tanggal_selesai: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="alasan">Alasan</Label>
              <Input
                id="alasan"
                value={formData.alasan || ''}
                onChange={(e) => setFormData({ ...formData, alasan: e.target.value })}
                placeholder="Masukkan alasan"
                required
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
            {isLoading ? 'Mengajukan...' : 'Ajukan'}
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default IzinCutiForm;
