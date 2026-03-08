export interface IzinCuti {
  izin_id: number;
  karyawan_id: number;
  tanggal_pengajuan: string;
  tanggal_mulai: string;
  tanggal_selesai: string;
  jenis: string;
  alasan: string;
  status: 'menunggu' | 'disetujui' | 'ditolak';
}

export interface IzinCutiWithDetails extends IzinCuti {
  nama_karyawan?: string;
  nama_lengkap?: string;
  jabatan?: string;
}

export interface CreateIzinCutiInput {
  karyawan_id: number;
  tanggal_pengajuan?: string;
  tanggal_mulai: string;
  tanggal_selesai: string;
  jenis: string;
  alasan: string;
  status?: 'menunggu' | 'disetujui' | 'ditolak';
}
