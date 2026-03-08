import { NextRequest } from 'next/server';
import { getIzinCutiById, updateIzinCuti, deleteIzinCuti } from '@/controllers/izinCutiController';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return getIzinCutiById(request, { id });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return updateIzinCuti(request, { id });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return deleteIzinCuti(request, { id });
}
