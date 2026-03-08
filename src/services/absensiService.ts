import { 
  getAllAbsensi, 
  getAbsensiById, 
  getAbsensiByKaryawanId,
  getAbsensiByDate,
  createAbsensi, 
  updateAbsensi, 
  deleteAbsensi,
} from '@/models/absensiModel';
import { Absensi, AbsensiWithDetails, CreateAbsensiInput, UpdateAbsensiInput } from '@/types/absensi.types';
import { getKaryawanById } from '@/models/karyawanModel';

export async function getAllAbsensiService(): Promise<AbsensiWithDetails[]> {
  return getAllAbsensi();
}

export async function getAbsensiByIdService(absensiId: number): Promise<AbsensiWithDetails | null> {
  return getAbsensiById(absensiId);
}

export async function getAbsensiByKaryawanIdService(karyawanId: number): Promise<Absensi[]> {
  return getAbsensiByKaryawanId(karyawanId);
}

export async function getAbsensiByDateService(date: string): Promise<AbsensiWithDetails[]> {
  return getAbsensiByDate(date);
}

export async function createAbsensiService(data: CreateAbsensiInput): Promise<number> {
  const karyawan = await getKaryawanById(data.karyawan_id);
  if (!karyawan) {
    throw new Error('Karyawan tidak ditemukan');
  }

  const absensiData: CreateAbsensiInput = {
    ...data,
    status_karyawan: karyawan.status,
  };

  return createAbsensi(absensiData);
}

export async function updateAbsensiService(absensiId: number, data: UpdateAbsensiInput): Promise<boolean> {
  const absensi = await getAbsensiById(absensiId);
  if (!absensi) {
    throw new Error('Absensi tidak ditemukan');
  }
  return updateAbsensi(absensiId, data);
}

export async function deleteAbsensiService(absensiId: number): Promise<boolean> {
  const absensi = await getAbsensiById(absensiId);
  if (!absensi) {
    throw new Error('Absensi tidak ditemukan');
  }
  return deleteAbsensi(absensiId);
}
