import { NextRequest } from 'next/server';
import { login, logout } from '@/controllers/authController';

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (body.action === 'logout') {
    return logout();
  }

  return login(body); // kirim body, bukan request
}

export async function DELETE() {
  return logout();
}