import pool from '@/lib/db';
import { JamKerja } from '@/types/jamKerja.types';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export const getAllJamKerja = async (): Promise<JamKerja[]> => {
  const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM jam_kerja');
  return rows as JamKerja[];
};

export const getJamKerjaById = async (id: number): Promise<JamKerja | null> => {
  const [rows] = await pool.execute<RowDataPacket[]>(
    'SELECT * FROM jam_kerja WHERE jam_kerja_id = ?',
    [id]
  );
  return (rows[0] as JamKerja) || null;
};

export const createJamKerja = async (data: Partial<JamKerja>): Promise<number> => {
  const { nama_shift, hari, jam_masuk, jam_pulang, keterangan } = data;
  const [result] = await pool.execute<ResultSetHeader>(
    'INSERT INTO jam_kerja (nama_shift, hari, jam_masuk, jam_pulang, keterangan) VALUES (?, ?, ?, ?, ?)',
    [nama_shift, hari, jam_masuk, jam_pulang, keterangan]
  );
  return result.insertId;
};
