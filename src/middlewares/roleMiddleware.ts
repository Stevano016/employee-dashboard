import { NextResponse } from "next/server";
import { AuthPayload } from "@/types/auth.types";

export type Role = "admin" | "hr" | "karyawan";

export const requireRole = (user: AuthPayload | null, allowedRoles: Role[]) => {
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (!allowedRoles.includes(user.role as Role)) {
    return NextResponse.json(
      { message: "Forbidden: Access Denied" },
      { status: 403 },
    );
  }

  return null;
};
