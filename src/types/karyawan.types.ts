export interface Karyawan {
  karyawan_id: number;
  departemen_id: number | null;
  jam_kerja_id: number | null;
  nama_lengkap: string;
  nik: string;
  jabatan: string;
  tanggal_masuk: string;
  status: 'aktif' | 'resign';
}

export interface KaryawanWithDetails extends Karyawan {
  nama_departemen?: string;
  nama_shift?: string;
  lokasi?: string;
  hari?: string;
  jam_masuk?: string;
  jam_pulang?: string;
}

export interface CreateKaryawanInput {
  nama_lengkap: string;
  nik: string;
  jabatan: string;
  tanggal_masuk: string;
  status: 'aktif' | 'resign';
  departemen_id: number | null;
  jam_kerja_id: number | null;
}

export interface UpdateKaryawanInput extends Partial<CreateKaryawanInput> {}
