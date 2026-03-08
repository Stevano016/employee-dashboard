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
import { IzinCutiWithDetails } from '@/types/izinCuti.types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Check, X } from 'lucide-react';

interface IzinCutiTableProps {
  data: IzinCutiWithDetails[];
  onUpdateStatus?: (id: number, status: 'disetujui' | 'ditolak') => Promise<void>;
  canApprove?: boolean;
}

export function IzinCutiTable({ data, onUpdateStatus, canApprove = false }: IzinCutiTableProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedIzin, setSelectedIzin] = useState<number | null>(null);
  const [action, setAction] = useState<'approve' | 'reject' | null>(null);
  const [loading, setLoading] = useState(false);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      menunggu: 'outline',
      disetujui: 'default',
      ditolak: 'destructive',
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  const handleActionClick = (id: number, actionType: 'approve' | 'reject') => {
    setSelectedIzin(id);
    setAction(actionType);
    setDialogOpen(true);
  };

  const handleConfirm = async () => {
    if (selectedIzin && action && onUpdateStatus) {
      setLoading(true);
      try {
        await onUpdateStatus(selectedIzin, action === 'approve' ? 'disetujui' : 'ditolak');
      } finally {
        setLoading(false);
        setDialogOpen(false);
        setSelectedIzin(null);
        setAction(null);
      }
    }
  };

  return (
    <>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tanggal Pengajuan</TableHead>
              <TableHead>Nama Karyawan</TableHead>
              <TableHead>Jenis</TableHead>
              <TableHead>Tanggal Mulai</TableHead>
              <TableHead>Tanggal Selesai</TableHead>
              <TableHead>Alasan</TableHead>
              <TableHead>Status</TableHead>
              {canApprove && <TableHead className="text-right">Aksi</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={canApprove ? 8 : 7} className="text-center py-8 text-muted-foreground">
                  Tidak ada data izin cuti
                </TableCell>
              </TableRow>
            ) : (
              data.map((izin) => (
                <TableRow key={izin.izin_id}>
                  <TableCell>
                    {new Date(izin.tanggal_pengajuan).toLocaleDateString('id-ID')}
                  </TableCell>
                  <TableCell className="font-medium">{izin.nama_karyawan || '-'}</TableCell>
                  <TableCell className="capitalize">{izin.jenis}</TableCell>
                  <TableCell>
                    {new Date(izin.tanggal_mulai).toLocaleDateString('id-ID')}
                  </TableCell>
                  <TableCell>
                    {new Date(izin.tanggal_selesai).toLocaleDateString('id-ID')}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{izin.alasan || '-'}</TableCell>
                  <TableCell>{getStatusBadge(izin.status)}</TableCell>
                  {canApprove && izin.status === 'menunggu' && (
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleActionClick(izin.izin_id, 'reject')}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Tolak
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleActionClick(izin.izin_id, 'approve')}
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Setujui
                        </Button>
                      </div>
                    </TableCell>
                  )}
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
              {action === 'approve' ? 'Setujui' : 'Tolak'} Izin Cuti
            </DialogTitle>
            <DialogDescription>
              {action === 'approve'
                ? 'Apakah Anda yakin ingin menyetujui izin cuti ini?'
                : 'Apakah Anda yakin ingin menolak izin cuti ini?'}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={loading}>
              Batal
            </Button>
            <Button
              variant={action === 'approve' ? 'default' : 'destructive'}
              onClick={handleConfirm}
              disabled={loading}
            >
              {action === 'approve' ? 'Setujui' : 'Tolak'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default IzinCutiTable;
