import pool from '@/lib/db';
import { Absensi, AbsensiWithDetails } from '@/types/absensi.types';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export const getAllAbsensi = async (): Promise<AbsensiWithDetails[]> => {
  const [rows] = await pool.execute<RowDataPacket[]>(
    `SELECT a.*, k.nama_lengkap as nama_karyawan, k.nama_lengkap, k.jabatan 
     FROM absensi a 
     JOIN karyawan k ON a.karyawan_id = k.karyawan_id`
  );
  return rows as AbsensiWithDetails[];
};

export const getAbsensiByKaryawanId = async (karyawanId: number): Promise<Absensi[]> => {
  const [rows] = await pool.execute<RowDataPacket[]>(
    'SELECT * FROM absensi WHERE karyawan_id = ? ORDER BY tanggal DESC',
    [karyawanId]
  );
  return rows as Absensi[];
};

export const checkAbsensiHariIni = async (karyawanId: number, tanggal: string): Promise<Absensi | null> => {
  const [rows] = await pool.execute<RowDataPacket[]>(
    'SELECT * FROM absensi WHERE karyawan_id = ? AND tanggal = ?',
    [karyawanId, tanggal]
  );
  return (rows[0] as Absensi) || null;
};

export const createAbsensi = async (data: Partial<Absensi>): Promise<number> => {
  const { karyawan_id, tanggal, waktu_masuk, status_kehadiran, status_karyawan, catatan } = data;
  const [result] = await pool.execute<ResultSetHeader>(
    'INSERT INTO absensi (karyawan_id, tanggal, waktu_masuk, status_kehadiran, status_karyawan, catatan) VALUES (?, ?, ?, ?, ?, ?)',
    [karyawan_id, tanggal, waktu_masuk, status_kehadiran, status_karyawan, catatan]
  );
  return result.insertId;
};

export const updateAbsensiPulang = async (id: number, waktuPulang: string): Promise<boolean> => {
  const [result] = await pool.execute<ResultSetHeader>(
    'UPDATE absensi SET waktu_pulang = ? WHERE absensi_id = ?',
    [waktuPulang, id]
  );
  return result.affectedRows > 0;
};
