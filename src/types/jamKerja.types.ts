export interface JamKerja {
  jam_kerja_id: number;
  nama_shift: string;
  hari: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu' | 'Minggu';
  jam_masuk: string;
  jam_pulang: string;
  keterangan: string;
}
