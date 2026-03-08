
import { NextRequest, NextResponse } from 'next/server';
import {
  getAllKaryawan,
  getKaryawanById,
  createKaryawan,
  updateKaryawan,
  deleteKaryawan,
} from '@/services/karyawanService';

import {
  authMiddleware,
  successResponse,
  errorResponse,
  notFoundResponse,
  badRequestResponse
} from '@/middlewares/authMiddleware';

import { requireRole, Role } from '@/middlewares/roleMiddleware';
import { CreateKaryawanInput, UpdateKaryawanInput } from '@/types/karyawan.types';

export async function getKaryawan(request: NextRequest): Promise<NextResponse> {
  try {
    const user = await authMiddleware(request);
    if (!user) return errorResponse('Unauthorized', 401);

    const karyawan = await getAllKaryawan();

    return successResponse({ karyawan });
  } catch (error) {
    console.error('Get karyawan error:', error);
    return errorResponse('Terjadi kesalahan', 500);
  }
}

export async function getKaryawanByIdController(
  request: NextRequest,
  params: { id: string }
): Promise<NextResponse> {
  try {
    const user = await authMiddleware(request);
    if (!user) return errorResponse('Unauthorized', 401);

    const karyawanId = parseInt(params.id);
    if (isNaN(karyawanId)) {
      return badRequestResponse('ID karyawan tidak valid');
    }

    const karyawan = await getKaryawanById(karyawanId);
    if (!karyawan) {
      return notFoundResponse('Karyawan tidak ditemukan');
    }

    return successResponse({ karyawan });
  } catch (error) {
    console.error('Get karyawan by id error:', error);
    return errorResponse('Terjadi kesalahan', 500);
  }
}

export async function createKaryawanController(
  request: NextRequest
): Promise<NextResponse> {
  try {
    const user = await authMiddleware(request);
    if (!user) return errorResponse('Unauthorized', 401);

    const roleCheck = requireRole(user, ['admin'] as Role[]);
    if (roleCheck) return roleCheck;

    const body = await request.json();

    const {
      nama_lengkap,
      nik,
      jabatan,
      tanggal_masuk,
      status,
      departemen_id,
      jam_kerja_id,
    } = body as CreateKaryawanInput;

    if (!nama_lengkap || !nik || !jabatan || !tanggal_masuk || !status) {
      return badRequestResponse('Data karyawan tidak lengkap');
    }

    const karyawanId = await createKaryawan({
      nama_lengkap,
      nik,
      jabatan,
      tanggal_masuk,
      status,
      departemen_id,
      jam_kerja_id,
    });

    return successResponse(
      {
        karyawan_id: karyawanId,
        message: 'Karyawan berhasil ditambahkan',
      },
      201
    );
  } catch (error) {
    console.error('Create karyawan error:', error);

    if (error instanceof Error && error.message === 'NIK sudah terdaftar') {
      return errorResponse(error.message, 400);
    }

    return errorResponse('Terjadi kesalahan', 500);
  }
}

export async function updateKaryawanController(
  request: NextRequest,
  params: { id: string }
): Promise<NextResponse> {
  try {
    const user = await authMiddleware(request);
    if (!user) return errorResponse('Unauthorized', 401);

    const roleCheck = requireRole(user, ['admin'] as Role[]);
    if (roleCheck) return roleCheck;

    const karyawanId = parseInt(params.id);
    if (isNaN(karyawanId)) {
      return badRequestResponse('ID karyawan tidak valid');
    }

    const body = await request.json();
    const data = body as UpdateKaryawanInput;

    const success = await updateKaryawan(karyawanId, {
      ...data,
      karyawan_id: karyawanId,
    });

    if (!success) {
      return notFoundResponse('Karyawan tidak ditemukan');
    }

    return successResponse({
      message: 'Karyawan berhasil diupdate',
    });
  } catch (error) {
    console.error('Update karyawan error:', error);

    if (error instanceof Error && error.message === 'NIK sudah terdaftar') {
      return errorResponse(error.message, 400);
    }

    return errorResponse('Terjadi kesalahan', 500);
  }
}

export async function deleteKaryawanController(
  request: NextRequest,
  params: { id: string }
): Promise<NextResponse> {
  try {
    const user = await authMiddleware(request);
    if (!user) return errorResponse('Unauthorized', 401);

    const roleCheck = requireRole(user, ['admin'] as Role[]);
    if (roleCheck) return roleCheck;

    const karyawanId = parseInt(params.id);
    if (isNaN(karyawanId)) {
      return badRequestResponse('ID karyawan tidak valid');
    }

    const success = await deleteKaryawan(karyawanId);

    if (!success) {
      return notFoundResponse('Karyawan tidak ditemukan');
    }

    return successResponse({
      message: 'Karyawan berhasil dihapus',
    });
  } catch (error) {
    console.error('Delete karyawan error:', error);
    return errorResponse('Terjadi kesalahan', 500);
  }
}
