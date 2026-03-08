import { 
  getAllJamKerja, 
  getJamKerjaById, 
  getJamKerjaByHari,
  createJamKerja, 
  updateJamKerja, 
  deleteJamKerja,
} from '@/models/jamKerjaModel';
import { JamKerja, CreateJamKerjaInput, UpdateJamKerjaInput } from '@/types/jamKerja.types';

export async function getAllJamKerjaService(): Promise<JamKerja[]> {
  return getAllJamKerja();
}

export async function getJamKerjaByIdService(jamKerjaId: number): Promise<JamKerja | null> {
  return getJamKerjaById(jamKerjaId);
}

export async function getJamKerjaByHariService(hari: string): Promise<JamKerja[]> {
  return getJamKerjaByHari(hari);
}

export async function createJamKerjaService(data: CreateJamKerjaInput): Promise<number> {
  return createJamKerja(data);
}

export async function updateJamKerjaService(jamKerjaId: number, data: UpdateJamKerjaInput): Promise<boolean> {
  const jamKerja = await getJamKerjaById(jamKerjaId);
  if (!jamKerja) {
    throw new Error('Jam kerja tidak ditemukan');
  }
  return updateJamKerja(jamKerjaId, data);
}

export async function deleteJamKerjaService(jamKerjaId: number): Promise<boolean> {
  const jamKerja = await getJamKerjaById(jamKerjaId);
  if (!jamKerja) {
    throw new Error('Jam kerja tidak ditemukan');
  }
  return deleteJamKerja(jamKerjaId);
}
