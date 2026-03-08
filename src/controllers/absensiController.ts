import { NextRequest, NextResponse } from 'next/server';
import {
  getAllAbsensiService,
  getAbsensiByIdService,
  getAbsensiByKaryawanIdService,
  getAbsensiByDateService,
  createAbsensiService,
  updateAbsensiService,
  deleteAbsensiService,
} from '@/services/absensiService';
import { authMiddleware, successResponse, errorResponse, notFoundResponse, badRequestResponse } from '@/middlewares/authMiddleware';
import { requireRole, Role } from '@/middlewares/roleMiddleware';
import { CreateAbsensiInput, UpdateAbsensiInput } from '@/types/absensi.types';

export async function getAbsensi(request: NextRequest): Promise<NextResponse> {
  try {
    const user = await authMiddleware(request);
    if (!user) {
      return errorResponse('Unauthorized', 401);
    }

    const { searchParams } = new URL(request.url);
    const tanggal = searchParams.get('tanggal');
    const karyawan_id = searchParams.get('karyawan_id');

    let absensi;
    if (tanggal) {
      absensi = await getAbsensiByDateService(tanggal);
    } else if (karyawan_id) {
      absensi = await getAbsensiByKaryawanIdService(parseInt(karyawan_id));
    } else {
      absensi = await getAllAbsensiService();
    }

    return successResponse({ absensi });
  } catch (error) {
    console.error('Get absensi error:', error);
    return errorResponse('Terjadi kesalahan', 500);
  }
}

export async function getAbsensiById(request: NextRequest, params: { id: string }): Promise<NextResponse> {
  try {
    const user = await authMiddleware(request);
    if (!user) {
      return errorResponse('Unauthorized', 401);
    }

    const absensiId = parseInt(params.id);
    if (isNaN(absensiId)) {
      return badRequestResponse('ID absensi tidak valid');
    }

    const absensi = await getAbsensiByIdService(absensiId);
    if (!absensi) {
      return notFoundResponse('Absensi tidak ditemukan');
    }

    return successResponse({ absensi });
  } catch (error) {
    console.error('Get absensi by id error:', error);
    return errorResponse('Terjadi kesalahan', 500);
  }
}

export async function createAbsensi(request: NextRequest): Promise<NextResponse> {
  try {
    const user = await authMiddleware(request);
    if (!user) {
      return errorResponse('Unauthorized', 401);
    }

    const roleCheck = requireRole(user, ['admin', 'hr'] as Role[]);
    if (roleCheck) return roleCheck;

    const body = await request.json();
    const { karyawan_id, tanggal, waktu_masuk, waktu_pulang, status_kehadiran, catatan } = body as CreateAbsensiInput;

    if (!karyawan_id || !tanggal || !status_kehadiran) {
      return badRequestResponse('Data absensi tidak lengkap');
    }

    const absensiId = await createAbsensiService({
      karyawan_id,
      tanggal,
      waktu_masuk,
      waktu_pulang,
      status_kehadiran,
      catatan,
    });

    return successResponse({ 
      absensi_id: absensiId,
      message: 'Absensi berhasil ditambahkan' 
    }, 201);
  } catch (error) {
    console.error('Create absensi error:', error);
    if (error instanceof Error) {
      return errorResponse(error.message, 400);
    }
    return errorResponse('Terjadi kesalahan', 500);
  }
}

export async function updateAbsensi(request: NextRequest, params: { id: string }): Promise<NextResponse> {
  try {
    const user = await authMiddleware(request);
    if (!user) {
      return errorResponse('Unauthorized', 401);
    }

    const roleCheck = requireRole(user, ['admin', 'hr'] as Role[]);
    if (roleCheck) return roleCheck;

    const absensiId = parseInt(params.id);
    if (isNaN(absensiId)) {
      return badRequestResponse('ID absensi tidak valid');
    }

    const body = await request.json();
    const data = body as UpdateAbsensiInput;

    const success = await updateAbsensiService(absensiId, { ...data, absensi_id: absensiId });
    if (!success) {
      return notFoundResponse('Absensi tidak ditemukan');
    }

    return successResponse({ message: 'Absensi berhasil diupdate' });
  } catch (error) {
    console.error('Update absensi error:', error);
    if (error instanceof Error) {
      return errorResponse(error.message, 400);
    }
    return errorResponse('Terjadi kesalahan', 500);
  }
}

export async function deleteAbsensi(request: NextRequest, params: { id: string }): Promise<NextResponse> {
  try {
    const user = await authMiddleware(request);
    if (!user) {
      return errorResponse('Unauthorized', 401);
    }

    const roleCheck = requireRole(user, ['admin', 'hr'] as Role[]);
    if (roleCheck) return roleCheck;

    const absensiId = parseInt(params.id);
    if (isNaN(absensiId)) {
      return badRequestResponse('ID absensi tidak valid');
    }

    const success = await deleteAbsensiService(absensiId);
    if (!success) {
      return notFoundResponse('Absensi tidak ditemukan');
    }

    return successResponse({ message: 'Absensi berhasil dihapus' });
  } catch (error) {
    console.error('Delete absensi error:', error);
    return errorResponse('Terjadi kesalahan', 500);
  }
}
