import { NextRequest } from 'next/server';
import { getKaryawanById, updateKaryawan, deleteKaryawan } from '@/controllers/karyawanController';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return getKaryawanById(request, { id });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return updateKaryawan(request, { id });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return deleteKaryawan(request, { id });
}
