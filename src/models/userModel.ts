import pool from "@/lib/db";
import { User } from "@/types/auth.types";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export const findUserByUsername = async (
  username: string,
): Promise<User | null> => {
  const [rows] = await pool.execute<RowDataPacket[]>(
    "SELECT * FROM user WHERE username = ?",
    [username],
  );

  return (rows[0] as User) || null;
};

export const findUserById = async (id: number): Promise<User | null> => {
  const [rows] = await pool.execute<RowDataPacket[]>(
    "SELECT * FROM user WHERE user_id = ?",
    [id],
  );

  return (rows[0] as User) || null;
};

export const createUser = async (userData: Partial<User>): Promise<number> => {
  const { id_karyawan, username, password, role, status } = userData;

  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO user (id_karyawan, username, password, role, status)
     VALUES (?, ?, ?, ?, ?)`,
    [id_karyawan, username, password, role, status],
  );

  return result.insertId;
};

export const updateUser = async (
  userId: number,
  userData: Partial<User>,
): Promise<boolean> => {
  const { id_karyawan, username, password, role, status } = userData;

  const [result] = await pool.execute<ResultSetHeader>(
    `UPDATE user 
     SET id_karyawan = ?, username = ?, password = ?, role = ?, status = ?
     WHERE user_id = ?`,
    [id_karyawan, username, password, role, status, userId],
  );

  return result.affectedRows > 0;
};

export const deleteUser = async (userId: number): Promise<boolean> => {
  const [result] = await pool.execute<ResultSetHeader>(
    "DELETE FROM user WHERE user_id = ?",
    [userId],
  );

  return result.affectedRows > 0;
};
