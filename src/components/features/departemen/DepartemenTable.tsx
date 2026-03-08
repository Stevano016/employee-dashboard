'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Departemen } from '@/types/departemen.types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Pencil, Trash2 } from 'lucide-react';

interface DepartemenTableProps {
  data: Departemen[];
  onCreate: (data: { nama_departemen: string; lokasi?: string | null }) => Promise<void>;
  onUpdate: (id: number, data: { nama_departemen?: string; lokasi?: string | null }) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  loading?: boolean;
}

export function DepartemenTable({ data, onCreate, onUpdate, onDelete, loading }: DepartemenTableProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDepartemen, setSelectedDepartemen] = useState<Departemen | null>(null);
  const [formData, setFormData] = useState({ nama_departemen: '', lokasi: '' });

  const handleOpenDialog = (departemen?: Departemen) => {
    if (departemen) {
      setSelectedDepartemen(departemen);
      setFormData({
        nama_departemen: departemen.nama_departemen,
        lokasi: departemen.lokasi || '',
      });
    } else {
      setSelectedDepartemen(null);
      setFormData({ nama_departemen: '', lokasi: '' });
    }
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDepartemen) {
      await onUpdate(selectedDepartemen.departemen_id, {
        nama_departemen: formData.nama_departemen,
        lokasi: formData.lokasi || null,
      });
    } else {
      await onCreate({
        nama_departemen: formData.nama_departemen,
        lokasi: formData.lokasi || null,
      });
    }
    setDialogOpen(false);
    setFormData({ nama_departemen: '', lokasi: '' });
    setSelectedDepartemen(null);
  };

  const handleDelete = async () => {
    if (selectedDepartemen) {
      await onDelete(selectedDepartemen.departemen_id);
      setDeleteDialogOpen(false);
      setSelectedDepartemen(null);
    }
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={() => handleOpenDialog()}>Tambah Departemen</Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Departemen</TableHead>
              <TableHead>Lokasi</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                  Tidak ada data departemen
                </TableCell>
              </TableRow>
            ) : (
              data.map((departemen) => (
                <TableRow key={departemen.departemen_id}>
                  <TableCell className="font-medium">{departemen.nama_departemen}</TableCell>
                  <TableCell>{departemen.lokasi || '-'}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenDialog(departemen)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedDepartemen(departemen);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedDepartemen ? 'Edit' : 'Tambah'} Departemen
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="nama_departemen">Nama Departemen</Label>
                <Input
                  id="nama_departemen"
                  value={formData.nama_departemen}
                  onChange={(e) =>
                    setFormData({ ...formData, nama_departemen: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lokasi">Lokasi</Label>
                <Input
                  id="lokasi"
                  value={formData.lokasi}
                  onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Batal
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Menyimpan...' : 'Simpan'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus departemen ini? Tindakan ini tidak dapat
              dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={loading}>
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DepartemenTable;
