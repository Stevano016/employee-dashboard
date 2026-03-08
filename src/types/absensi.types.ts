export interface Absensi {
  absensi_id: number;
  karyawan_id: number;
  tanggal: string;
  waktu_masuk: string | null;
  waktu_pulang: string | null;
  status_kehadiran: 'hadir' | 'terlambat' | 'izin' | 'sakit' | 'alpha';
  status_karyawan: 'aktif' | 'resign';
  catatan: string | null;
}

export interface AbsensiWithDetails extends Absensi {
  nama_karyawan?: string;
  nama_lengkap?: string;
  jabatan?: string;
  nama_departemen?: string;
}

export interface CreateAbsensiInput {
  karyawan_id: number;
  tanggal: string;
  waktu_masuk?: string | null;
  waktu_pulang?: string | null;
  status_kehadiran: 'hadir' | 'terlambat' | 'izin' | 'sakit' | 'alpha';
  status_karyawan?: 'aktif' | 'resign';
  catatan?: string | null;
}
