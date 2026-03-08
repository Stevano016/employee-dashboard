import { NextRequest } from 'next/server';
import { getAbsensiById, updateAbsensi, deleteAbsensi } from '@/controllers/absensiController';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return getAbsensiById(request, { id });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return updateAbsensi(request, { id });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return deleteAbsensi(request, { id });
}
