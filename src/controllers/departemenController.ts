import { NextRequest, NextResponse } from 'next/server';
import {
  getAllDepartemenService,
  getDepartemenByIdService,
  createDepartemenService,
  updateDepartemenService,
  deleteDepartemenService,
} from '@/services/departemenService';
import { authMiddleware, successResponse, errorResponse, notFoundResponse, badRequestResponse } from '@/middlewares/authMiddleware';
import { requireRole, Role } from '@/middlewares/roleMiddleware';
import { CreateDepartemenInput, UpdateDepartemenInput } from '@/types/departemen.types';

export async function getDepartemen(request: NextRequest): Promise<NextResponse> {
  try {
    const user = await authMiddleware(request);
    if (!user) {
      return errorResponse('Unauthorized', 401);
    }

    const departemen = await getAllDepartemenService();
    return successResponse({ departemen });
  } catch (error) {
    console.error('Get departemen error:', error);
    return errorResponse('Terjadi kesalahan', 500);
  }
}

export async function getDepartemenById(request: NextRequest, params: { id: string }): Promise<NextResponse> {
  try {
    const user = await authMiddleware(request);
    if (!user) {
      return errorResponse('Unauthorized', 401);
    }

    const departemenId = parseInt(params.id);
    if (isNaN(departemenId)) {
      return badRequestResponse('ID departemen tidak valid');
    }

    const departemen = await getDepartemenByIdService(departemenId);
    if (!departemen) {
      return notFoundResponse('Departemen tidak ditemukan');
    }

    return successResponse({ departemen });
  } catch (error) {
    console.error('Get departemen by id error:', error);
    return errorResponse('Terjadi kesalahan', 500);
  }
}

export async function createDepartemen(request: NextRequest): Promise<NextResponse> {
  try {
    const user = await authMiddleware(request);
    if (!user) {
      return errorResponse('Unauthorized', 401);
    }

    const roleCheck = requireRole(user, ['admin'] as Role[]);
    if (roleCheck) return roleCheck;

    const body = await request.json();
    const { nama_departemen, lokasi } = body as CreateDepartemenInput;

    if (!nama_departemen) {
      return badRequestResponse('Nama departemen wajib diisi');
    }

    const departemenId = await createDepartemenService({
      nama_departemen,
      lokasi,
    });

    return successResponse({ 
      departemen_id: departemenId,
      message: 'Departemen berhasil ditambahkan' 
    }, 201);
  } catch (error) {
    console.error('Create departemen error:', error);
    if (error instanceof Error) {
      return errorResponse(error.message, 400);
    }
    return errorResponse('Terjadi kesalahan', 500);
  }
}

export async function updateDepartemen(request: NextRequest, params: { id: string }): Promise<NextResponse> {
  try {
    const user = await authMiddleware(request);
    if (!user) {
      return errorResponse('Unauthorized', 401);
    }

    const roleCheck = requireRole(user, ['admin'] as Role[]);
    if (roleCheck) return roleCheck;

    const departemenId = parseInt(params.id);
    if (isNaN(departemenId)) {
      return badRequestResponse('ID departemen tidak valid');
    }

    const body = await request.json();
    const data = body as UpdateDepartemenInput;

    const success = await updateDepartemenService(departemenId, data);
    if (!success) {
      return notFoundResponse('Departemen tidak ditemukan');
    }

    return successResponse({ message: 'Departemen berhasil diupdate' });
  } catch (error) {
    console.error('Update departemen error:', error);
    if (error instanceof Error) {
      return errorResponse(error.message, 400);
    }
    return errorResponse('Terjadi kesalahan', 500);
  }
}

export async function deleteDepartemen(request: NextRequest, params: { id: string }): Promise<NextResponse> {
  try {
    const user = await authMiddleware(request);
    if (!user) {
      return errorResponse('Unauthorized', 401);
    }

    const roleCheck = requireRole(user, ['admin'] as Role[]);
    if (roleCheck) return roleCheck;

    const departemenId = parseInt(params.id);
    if (isNaN(departemenId)) {
      return badRequestResponse('ID departemen tidak valid');
    }

    const success = await deleteDepartemenService(departemenId);
    if (!success) {
      return notFoundResponse('Departemen tidak ditemukan');
    }

    return successResponse({ message: 'Departemen berhasil dihapus' });
  } catch (error) {
    console.error('Delete departemen error:', error);
    return errorResponse('Terjadi kesalahan', 500);
  }
}
