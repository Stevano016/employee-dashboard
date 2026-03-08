import pool from '@/lib/db';
import { IzinCuti, IzinCutiWithDetails } from '@/types/izinCuti.types';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export const getAllIzinCuti = async (): Promise<IzinCutiWithDetails[]> => {
  const [rows] = await pool.execute<RowDataPacket[]>(
    `SELECT i.*, k.nama_lengkap as nama_karyawan, k.nama_lengkap, k.jabatan 
     FROM izin_cuti i 
     JOIN karyawan k ON i.karyawan_id = k.karyawan_id`
  );
  return rows as IzinCutiWithDetails[];
};

export const getIzinCutiByKaryawanId = async (karyawanId: number): Promise<IzinCuti[]> => {
  const [rows] = await pool.execute<RowDataPacket[]>(
    'SELECT * FROM izin_cuti WHERE karyawan_id = ? ORDER BY tanggal_pengajuan DESC',
    [karyawanId]
  );
  return rows as IzinCuti[];
};

export const createIzinCuti = async (data: Partial<IzinCuti>): Promise<number> => {
  const { karyawan_id, tanggal_pengajuan, tanggal_mulai, tanggal_selesai, jenis, alasan, status } = data;
  const [result] = await pool.execute<ResultSetHeader>(
    'INSERT INTO izin_cuti (karyawan_id, tanggal_pengajuan, tanggal_mulai, tanggal_selesai, jenis, alasan, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [karyawan_id, tanggal_pengajuan, tanggal_mulai, tanggal_selesai, jenis, alasan, status]
  );
  return result.insertId;
};

export const updateStatusIzinCuti = async (id: number, status: string): Promise<boolean> => {
  const [result] = await pool.execute<ResultSetHeader>(
    'UPDATE izin_cuti SET status = ? WHERE izin_id = ?',
    [status, id]
  );
  return result.affectedRows > 0;
};
