import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export interface TokenPayload {
  email: string;
  Fname: string;
  userID: string;
  role: "admin" | "user";
  iat?: number;
  exp?: number;
}

export async function ValidateToken() {
  const token = (await cookies()).get("token")?.value;

  if (!token) return null;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
    if (!payload || typeof payload !== "object") return null;
    return payload;
  } catch (error) {
    return null;
  }
}
