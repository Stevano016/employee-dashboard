import db from "@/lib/db";
import { Karyawan } from "@/types/karyawan.types";

export const getAllKaryawan = async () => {
  const [rows] = await db.query("SELECT * FROM karyawan");
  return rows;
};

export const getKaryawanById = async (id: number) => {
  const [rows]: any = await db.query(
    "SELECT * FROM karyawan WHERE karyawan_id = ?",
    [id],
  );

  return rows[0] || null;
};

export const createKaryawan = async (data: Partial<Karyawan>) => {
  const query = `
    INSERT INTO karyawan 
    (nama_lengkap, nik, jabatan, tanggal_masuk, status, departemen_id, jam_kerja_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    data.nama_lengkap,
    data.nik,
    data.jabatan,
    data.tanggal_masuk,
    data.status,
    data.departemen_id,
    data.jam_kerja_id,
  ];

  const [result]: any = await db.execute(query, values);

  return result.insertId;
};

export const updateKaryawan = async (id: number, data: Partial<Karyawan>) => {
  const query = `
    UPDATE karyawan
    SET nama_lengkap=?, nik=?, jabatan=?, tanggal_masuk=?, status=?, departemen_id=?, jam_kerja_id=?
    WHERE karyawan_id=?
  `;

  const values = [
    data.nama_lengkap,
    data.nik,
    data.jabatan,
    data.tanggal_masuk,
    data.status,
    data.departemen_id,
    data.jam_kerja_id,
    id,
  ];

  const [result]: any = await db.execute(query, values);

  return result.affectedRows > 0;
};

export const deleteKaryawan = async (id: number) => {
  const [result]: any = await db.execute(
    "DELETE FROM karyawan WHERE karyawan_id = ?",
    [id],
  );

  return result.affectedRows > 0;
};
