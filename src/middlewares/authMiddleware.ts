import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT, JWTPayload } from '@/lib/jwt';

export interface AuthenticatedRequest extends NextRequest {
  user?: JWTPayload;
}

export async function authMiddleware(request: NextRequest): Promise<JWTPayload | null> {
  // Try to get token from Authorization header
  const authHeader = request.headers.get('Authorization');
  let token: string | null = null;

  if (authHeader?.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  }

  // If no header token, try cookies
  if (!token) {
    token = request.cookies.get('auth-token')?.value || null;
  }

  if (!token) {
    return null;
  }

  const payload = await verifyJWT(token);
  return payload;
}

export function unauthorizedResponse(message: string = 'Unauthorized'): NextResponse {
  return NextResponse.json(
    { error: message },
    { status: 401 }
  );
}

export function forbiddenResponse(message: string = 'Forbidden'): NextResponse {
  return NextResponse.json(
    { error: message },
    { status: 403 }
  );
}

export function badRequestResponse(message: string = 'Bad Request'): NextResponse {
  return NextResponse.json(
    { error: message },
    { status: 400 }
  );
}

export function notFoundResponse(message: string = 'Not Found'): NextResponse {
  return NextResponse.json(
    { error: message },
    { status: 404 }
  );
}

export function successResponse<T>(data: T, status: number = 200): NextResponse<T> {
  return NextResponse.json(data, { status });
}

export function errorResponse(message: string, status: number = 500): NextResponse {
  return NextResponse.json(
    { error: message },
    { status }
  );
}
