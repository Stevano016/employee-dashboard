export const STATUS_KARYAWAN = {
  AKTIF: 'aktif',
  RESIGN: 'resign',
} as const;

export const STATUS_KEHADIRAN = {
  HADIR: 'hadir',
  TERLAMBAT: 'terlambat',
  IZIN: 'izin',
  SAKIT: 'sakit',
  ALPHA: 'alpha',
} as const;

export const STATUS_IZIN = {
  MENUNGGU: 'menunggu',
  DISETUJUI: 'disetujui',
  DITOLAK: 'ditolak',
} as const;

export const JENIS_IZIN_OPTIONS = [
  { label: 'Cuti Tahunan', value: 'cuti' },
  { label: 'Sakit', value: 'sakit' },
  { label: 'Izin Alasan Penting', value: 'izin' },
  { label: 'Lainnya', value: 'lainnya' },
];

export const STATUS_OPTIONS = {
  karyawan: [
    { label: 'Aktif', value: 'aktif' },
    { label: 'Resign', value: 'resign' },
  ],
  kehadiran: [
    { label: 'Hadir', value: 'hadir' },
    { label: 'Terlambat', value: 'terlambat' },
    { label: 'Izin', value: 'izin' },
    { label: 'Sakit', value: 'sakit' },
    { label: 'Alpha', value: 'alpha' },
  ],
  izin: [
    { label: 'Menunggu', value: 'menunggu' },
    { label: 'Disetujui', value: 'disetujui' },
    { label: 'Ditolak', value: 'ditolak' },
  ],
};
