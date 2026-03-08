import { NextRequest } from 'next/server';
import { getDepartemenById, updateDepartemen, deleteDepartemen } from '@/controllers/departemenController';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return getDepartemenById(request, { id });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return updateDepartemen(request, { id });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return deleteDepartemen(request, { id });
}
