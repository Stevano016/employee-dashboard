import { NextRequest } from 'next/server';
import { getJamKerjaById, updateJamKerja, deleteJamKerja } from '@/controllers/jamKerjaController';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return getJamKerjaById(request, { id });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return updateJamKerja(request, { id });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return deleteJamKerja(request, { id });
}
