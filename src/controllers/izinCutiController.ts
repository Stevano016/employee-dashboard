import { NextRequest, NextResponse } from 'next/server';
import {
  getAllIzinCutiService,
  getIzinCutiByIdService,
  getIzinCutiByKaryawanIdService,
  getIzinCutiByStatusService,
  createIzinCutiService,
  updateIzinCutiService,
  deleteIzinCutiService,
} from '@/services/izinCutiService';
import { authMiddleware, successResponse, errorResponse, notFoundResponse, badRequestResponse } from '@/middlewares/authMiddleware';
import { requireRole, Role } from '@/middlewares/roleMiddleware';
import { CreateIzinCutiInput, UpdateIzinCutiInput } from '@/types/izinCuti.types';

export async function getIzinCuti(request: NextRequest): Promise<NextResponse> {
  try {
    const user = await authMiddleware(request);
    if (!user) {
      return errorResponse('Unauthorized', 401);
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as 'menunggu' | 'disetujui' | 'ditolak' | null;
    const karyawan_id = searchParams.get('karyawan_id');

    let izinCuti;
    if (status) {
      const roleCheck = requireRole(user, ['admin', 'hr'] as Role[]);
      if (roleCheck) return roleCheck;
      izinCuti = await getIzinCutiByStatusService(status);
    } else if (karyawan_id) {
      izinCuti = await getIzinCutiByKaryawanIdService(parseInt(karyawan_id));
    } else {
      izinCuti = await getAllIzinCutiService();
    }

    return successResponse({ izinCuti });
  } catch (error) {
    console.error('Get izin cuti error:', error);
    return errorResponse('Terjadi kesalahan', 500);
  }
}

export async function getIzinCutiById(request: NextRequest, params: { id: string }): Promise<NextResponse> {
  try {
    const user = await authMiddleware(request);
    if (!user) {
      return errorResponse('Unauthorized', 401);
    }

    const izinId = parseInt(params.id);
    if (isNaN(izinId)) {
      return badRequestResponse('ID izin cuti tidak valid');
    }

    const izinCuti = await getIzinCutiByIdService(izinId);
    if (!izinCuti) {
      return notFoundResponse('Izin cuti tidak ditemukan');
    }

    return successResponse({ izinCuti });
  } catch (error) {
    console.error('Get izin cuti by id error:', error);
    return errorResponse('Terjadi kesalahan', 500);
  }
}

export async function createIzinCuti(request: NextRequest): Promise<NextResponse> {
  try {
    const user = await authMiddleware(request);
    if (!user) {
      return errorResponse('Unauthorized', 401);
    }

    const body = await request.json();
    const { tanggal_mulai, tanggal_selesai, jenis, alasan, karyawan_id } = body as CreateIzinCutiInput;

    if (!tanggal_mulai || !tanggal_selesai || !jenis) {
      return badRequestResponse('Data izin cuti tidak lengkap');
    }

    const finalKaryawanId = karyawan_id || user.karyawan_id;
    if (!finalKaryawanId) {
      return badRequestResponse('Karyawan ID tidak ditemukan');
    }

    const izinId = await createIzinCutiService({
      karyawan_id: finalKaryawanId,
      tanggal_mulai,
      tanggal_selesai,
      jenis,
      alasan,
      status: 'menunggu',
    });

    return successResponse({ 
      izin_id: izinId,
      message: 'Izin cuti berhasil diajukan' 
    }, 201);
  } catch (error) {
    console.error('Create izin cuti error:', error);
    if (error instanceof Error) {
      return errorResponse(error.message, 400);
    }
    return errorResponse('Terjadi kesalahan', 500);
  }
}

export async function updateIzinCuti(request: NextRequest, params: { id: string }): Promise<NextResponse> {
  try {
    const user = await authMiddleware(request);
    if (!user) {
      return errorResponse('Unauthorized', 401);
    }

    const roleCheck = requireRole(user, ['admin', 'hr'] as Role[]);
    if (roleCheck) return roleCheck;

    const izinId = parseInt(params.id);
    if (isNaN(izinId)) {
      return badRequestResponse('ID izin cuti tidak valid');
    }

    const body = await request.json();
    const data = body as UpdateIzinCutiInput;

    const success = await updateIzinCutiService(izinId, { ...data, izin_id: izinId });
    if (!success) {
      return notFoundResponse('Izin cuti tidak ditemukan');
    }

    return successResponse({ message: 'Izin cuti berhasil diupdate' });
  } catch (error) {
    console.error('Update izin cuti error:', error);
    if (error instanceof Error) {
      return errorResponse(error.message, 400);
    }
    return errorResponse('Terjadi kesalahan', 500);
  }
}

export async function deleteIzinCuti(request: NextRequest, params: { id: string }): Promise<NextResponse> {
  try {
    const user = await authMiddleware(request);
    if (!user) {
      return errorResponse('Unauthorized', 401);
    }

    const roleCheck = requireRole(user, ['admin', 'hr'] as Role[]);
    if (roleCheck) return roleCheck;

    const izinId = parseInt(params.id);
    if (isNaN(izinId)) {
      return badRequestResponse('ID izin cuti tidak valid');
    }

    const success = await deleteIzinCutiService(izinId);
    if (!success) {
      return notFoundResponse('Izin cuti tidak ditemukan');
    }

    return successResponse({ message: 'Izin cuti berhasil dihapus' });
  } catch (error) {
    console.error('Delete izin cuti error:', error);
    return errorResponse('Terjadi kesalahan', 500);
  }
}
