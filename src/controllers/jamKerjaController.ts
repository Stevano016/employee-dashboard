import { NextRequest, NextResponse } from 'next/server';
import {
  getAllJamKerjaService,
  getJamKerjaByIdService,
  createJamKerjaService,
  updateJamKerjaService,
  deleteJamKerjaService,
} from '@/services/jamKerjaService';
import { authMiddleware, successResponse, errorResponse, notFoundResponse, badRequestResponse } from '@/middlewares/authMiddleware';
import { requireRole, Role } from '@/middlewares/roleMiddleware';
import { CreateJamKerjaInput, UpdateJamKerjaInput } from '@/types/jamKerja.types';

export async function getJamKerja(request: NextRequest): Promise<NextResponse> {
  try {
    const user = await authMiddleware(request);
    if (!user) {
      return errorResponse('Unauthorized', 401);
    }

    const { searchParams } = new URL(request.url);
    const hari = searchParams.get('hari');

    let jamKerja;
    if (hari) {
      jamKerja = await getJamKerjaByHariService(hari);
    } else {
      jamKerja = await getAllJamKerjaService();
    }

    return successResponse({ jamKerja });
  } catch (error) {
    console.error('Get jam kerja error:', error);
    return errorResponse('Terjadi kesalahan', 500);
  }
}

export async function getJamKerjaById(request: NextRequest, params: { id: string }): Promise<NextResponse> {
  try {
    const user = await authMiddleware(request);
    if (!user) {
      return errorResponse('Unauthorized', 401);
    }

    const jamKerjaId = parseInt(params.id);
    if (isNaN(jamKerjaId)) {
      return badRequestResponse('ID jam kerja tidak valid');
    }

    const jamKerja = await getJamKerjaByIdService(jamKerjaId);
    if (!jamKerja) {
      return notFoundResponse('Jam kerja tidak ditemukan');
    }

    return successResponse({ jamKerja });
  } catch (error) {
    console.error('Get jam kerja by id error:', error);
    return errorResponse('Terjadi kesalahan', 500);
  }
}

export async function createJamKerja(request: NextRequest): Promise<NextResponse> {
  try {
    const user = await authMiddleware(request);
    if (!user) {
      return errorResponse('Unauthorized', 401);
    }

    const roleCheck = requireRole(user, ['admin'] as Role[]);
    if (roleCheck) return roleCheck;

    const body = await request.json();
    const { nama_shift, hari, jam_masuk, jam_pulang, keterangan } = body as CreateJamKerjaInput;

    if (!nama_shift || !hari || !jam_masuk || !jam_pulang) {
      return badRequestResponse('Data jam kerja tidak lengkap');
    }

    const jamKerjaId = await createJamKerjaService({
      nama_shift,
      hari,
      jam_masuk,
      jam_pulang,
      keterangan,
    });

    return successResponse({ 
      jam_kerja_id: jamKerjaId,
      message: 'Jam kerja berhasil ditambahkan' 
    }, 201);
  } catch (error) {
    console.error('Create jam kerja error:', error);
    if (error instanceof Error) {
      return errorResponse(error.message, 400);
    }
    return errorResponse('Terjadi kesalahan', 500);
  }
}

export async function updateJamKerja(request: NextRequest, params: { id: string }): Promise<NextResponse> {
  try {
    const user = await authMiddleware(request);
    if (!user) {
      return errorResponse('Unauthorized', 401);
    }

    const roleCheck = requireRole(user, ['admin'] as Role[]);
    if (roleCheck) return roleCheck;

    const jamKerjaId = parseInt(params.id);
    if (isNaN(jamKerjaId)) {
      return badRequestResponse('ID jam kerja tidak valid');
    }

    const body = await request.json();
    const data = body as UpdateJamKerjaInput;

    const success = await updateJamKerjaService(jamKerjaId, { ...data, jam_kerja_id: jamKerjaId });
    if (!success) {
      return notFoundResponse('Jam kerja tidak ditemukan');
    }

    return successResponse({ message: 'Jam kerja berhasil diupdate' });
  } catch (error) {
    console.error('Update jam kerja error:', error);
    if (error instanceof Error) {
      return errorResponse(error.message, 400);
    }
    return errorResponse('Terjadi kesalahan', 500);
  }
}

export async function deleteJamKerja(request: NextRequest, params: { id: string }): Promise<NextResponse> {
  try {
    const user = await authMiddleware(request);
    if (!user) {
      return errorResponse('Unauthorized', 401);
    }

    const roleCheck = requireRole(user, ['admin'] as Role[]);
    if (roleCheck) return roleCheck;

    const jamKerjaId = parseInt(params.id);
    if (isNaN(jamKerjaId)) {
      return badRequestResponse('ID jam kerja tidak valid');
    }

    const success = await deleteJamKerjaService(jamKerjaId);
    if (!success) {
      return notFoundResponse('Jam kerja tidak ditemukan');
    }

    return successResponse({ message: 'Jam kerja berhasil dihapus' });
  } catch (error) {
    console.error('Delete jam kerja error:', error);
    return errorResponse('Terjadi kesalahan', 500);
  }
}
