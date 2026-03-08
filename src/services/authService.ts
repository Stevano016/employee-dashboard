import bcrypt from 'bcryptjs';
import { signJWT } from '@/lib/jwt';
import { findUserByUsername, findUserById, createUser, updateUser, deleteUser } from '@/models/userModel';
import { User, LoginInput, AuthResponse } from '@/types/auth.types';

export async function authenticateUser(input: LoginInput): Promise<AuthResponse | null> {
  const user = await findUserByUsername(input.username);
  
  if (!user) {
    return null;
  }

  const isValidPassword = await bcrypt.compare(input.password, user.password);
  
  if (!isValidPassword) {
    return null;
  }

  const token = await signJWT({
    user_id: user.user_id,
    role: user.role,
    karyawan_id: user.id_karyawan,
  });

  const { password, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    token,
  };
}

export async function getUserById(userId: number): Promise<Omit<User, 'password'> | null> {
  const user = await findUserById(userId);
  if (!user) return null;
  
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function createUserService(userData: Omit<User, 'user_id'>): Promise<number> {
  const hashedPassword = await hashPassword(userData.password);
  return createUser({ ...userData, password: hashedPassword });
}

export async function updateUserService(userId: number, userData: Partial<User>): Promise<boolean> {
  if (userData.password) {
    userData.password = await hashPassword(userData.password);
  }
  return updateUser(userId, userData);
}

export async function deleteUserService(userId: number): Promise<boolean> {
  return deleteUser(userId);
}
