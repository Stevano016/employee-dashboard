import * as karyawanModel from '@/models/karyawanModel';
import { Karyawan } from '@/types/karyawan.types';

export const getAllKaryawan = async () => {
  return await karyawanModel.getAllKaryawan();
};

export const getKaryawanById = async (id: number) => {
  return await karyawanModel.getKaryawanById(id);
};

export const createKaryawan = async (data: Partial<Karyawan>) => {
  return await karyawanModel.createKaryawan(data);
};

export const updateKaryawan = async (id: number, data: Partial<Karyawan>) => {
  return await karyawanModel.updateKaryawan(id, data);
};

export const deleteKaryawan = async (id: number) => {
  return await karyawanModel.deleteKaryawan(id);
};