export interface User {
  user_id: number;
  id_karyawan: number | null;
  username: string;
  password: string;
  role: 'admin' | 'hr' | 'karyawan';
  status: 'aktif' | 'resign';
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: Omit<User, 'password'>;
  token: string;
}

export interface JWTPayload {
  user_id: number;
  role: 'admin' | 'hr' | 'karyawan';
  karyawan_id: number | null;
}
