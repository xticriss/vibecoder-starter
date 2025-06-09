import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { env } from "./env"

// Password utilities
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

// JWT utilities
export interface JWTPayload {
  userId: string
  email: string
}

export function createToken(payload: JWTPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "7d", // 7 days
  })
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, env.JWT_SECRET) as JWTPayload
  } catch {
    return null
  }
}

// Cookie utilities
export const AUTH_COOKIE_NAME = "auth-token"

export function createAuthCookie(token: string): string {
  return `${AUTH_COOKIE_NAME}=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Lax${
    process.env.NODE_ENV === "production" ? "; Secure" : ""
  }`
}

export function clearAuthCookie(): string {
  return `${AUTH_COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`
}

export function getTokenFromCookies(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null
  
  const cookies = cookieHeader.split(";").map(cookie => cookie.trim())
  const authCookie = cookies.find(cookie => cookie.startsWith(`${AUTH_COOKIE_NAME}=`))
  
  return authCookie ? authCookie.split("=")[1] : null
}