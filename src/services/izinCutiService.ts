import { 
  getAllIzinCuti, 
  getIzinCutiById, 
  getIzinCutiByKaryawanId,
  getIzinCutiByStatus,
  createIzinCuti, 
  updateIzinCuti, 
  deleteIzinCuti,
} from '@/models/izinCutiModel';
import { IzinCuti, IzinCutiWithDetails, CreateIzinCutiInput, UpdateIzinCutiInput } from '@/types/izinCuti.types';

export async function getAllIzinCutiService(): Promise<IzinCutiWithDetails[]> {
  return getAllIzinCuti();
}

export async function getIzinCutiByIdService(izinId: number): Promise<IzinCutiWithDetails | null> {
  return getIzinCutiById(izinId);
}

export async function getIzinCutiByKaryawanIdService(karyawanId: number): Promise<IzinCuti[]> {
  return getIzinCutiByKaryawanId(karyawanId);
}

export async function getIzinCutiByStatusService(status: 'menunggu' | 'disetujui' | 'ditolak'): Promise<IzinCutiWithDetails[]> {
  return getIzinCutiByStatus(status);
}

export async function createIzinCutiService(data: CreateIzinCutiInput): Promise<number> {
  return createIzinCuti(data);
}

export async function updateIzinCutiService(izinId: number, data: UpdateIzinCutiInput): Promise<boolean> {
  const izin = await getIzinCutiById(izinId);
  if (!izin) {
    throw new Error('Izin cuti tidak ditemukan');
  }
  return updateIzinCuti(izinId, data);
}

export async function deleteIzinCutiService(izinId: number): Promise<boolean> {
  const izin = await getIzinCutiById(izinId);
  if (!izin) {
    throw new Error('Izin cuti tidak ditemukan');
  }
  return deleteIzinCuti(izinId);
}
