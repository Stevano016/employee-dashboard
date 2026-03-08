import { 
  getAllDepartemen, 
  getDepartemenById, 
  createDepartemen, 
  updateDepartemen, 
  deleteDepartemen,
} from '@/models/departemenModel';
import { Departemen, CreateDepartemenInput, UpdateDepartemenInput } from '@/types/departemen.types';

export async function getAllDepartemenService(): Promise<Departemen[]> {
  return getAllDepartemen();
}

export async function getDepartemenByIdService(departemenId: number): Promise<Departemen | null> {
  return getDepartemenById(departemenId);
}

export async function createDepartemenService(data: CreateDepartemenInput): Promise<number> {
  return createDepartemen(data);
}

export async function updateDepartemenService(departemenId: number, data: { nama_departemen?: string; lokasi?: string | null }): Promise<boolean> {
  const departemen = await getDepartemenById(departemenId);
  if (!departemen) {
    throw new Error('Departemen tidak ditemukan');
  }
  return updateDepartemen(departemenId, data);
}

export async function deleteDepartemenService(departemenId: number): Promise<boolean> {
  const departemen = await getDepartemenById(departemenId);
  if (!departemen) {
    throw new Error('Departemen tidak ditemukan');
  }
  return deleteDepartemen(departemenId);
}
