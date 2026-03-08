export const ROLES = {
  ADMIN: 'admin',
  HR: 'hr',
  KARYAWAN: 'karyawan',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];
