import { NextResponse, NextRequest } from 'next/server';
import { authenticateUser } from '@/services/authService';
import { authMiddleware, unauthorizedResponse, successResponse, errorResponse } from '@/middlewares/authMiddleware';
import { LoginInput } from '@/types/auth.types';

export async function login(body: LoginInput): Promise<NextResponse> {
  try {
    const { username, password } = body;

    if (!username || !password) {
      return errorResponse('Username dan password wajib diisi', 400);
    }

    const result = await authenticateUser({ username, password });

    if (!result) {
      return unauthorizedResponse('Username atau password salah');
    }

    const response = successResponse({
      user: result.user,
      message: 'Login berhasil',
    });

    response.cookies.set('auth-token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 8,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return errorResponse('Terjadi kesalahan saat login', 500);
  }
}

export async function logout(): Promise<NextResponse> {
  const response = successResponse({ message: 'Logout berhasil' });
  response.cookies.delete('auth-token');
  return response;
}

export async function getCurrentUser(request: NextRequest): Promise<NextResponse> {
  try {
    const user = await authMiddleware(request);

    if (!user) {
      return unauthorizedResponse('Unauthorized');
    }

    return successResponse({ user });
  } catch (error) {
    console.error('Get current user error:', error);
    return errorResponse('Terjadi kesalahan', 500);
  }
}