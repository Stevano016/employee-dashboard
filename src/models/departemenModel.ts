import pool from '@/lib/db';
import { Departemen } from '@/types/departemen.types';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export const getAllDepartemen = async (): Promise<Departemen[]> => {
  const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM departemen');
  return rows as Departemen[];
};

export const getDepartemenById = async (id: number): Promise<Departemen | null> => {
  const [rows] = await pool.execute<RowDataPacket[]>(
    'SELECT * FROM departemen WHERE departemen_id = ?',
    [id]
  );
  return (rows[0] as Departemen) || null;
};

export const createDepartemen = async (data: Partial<Departemen>): Promise<number> => {
  const { nama_departemen, lokasi } = data;
  const [result] = await pool.execute<ResultSetHeader>(
    'INSERT INTO departemen (nama_departemen, lokasi) VALUES (?, ?)',
    [nama_departemen, lokasi]
  );
  return result.insertId;
};
