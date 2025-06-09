import { NextRequest } from "next/server"
import { getTokenFromCookies, verifyToken } from "./auth"
import { prisma } from "./db"
import type { AuthUser } from "./types"

export async function getCurrentUser(request: NextRequest): Promise<AuthUser | null> {
  try {
    // Get token from cookies
    const cookieHeader = request.headers.get("cookie")
    const token = getTokenFromCookies(cookieHeader)

    if (!token) {
      return null
    }

    // Verify token
    const payload = verifyToken(token)
    
    if (!payload) {
      return null
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    })

    if (!user) {
      return null
    }

    // Return user without password
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
    }
  } catch {
    return null
  }
}

export function requireAuth() {
  return {
    unauthorized: () => new Response(
      JSON.stringify({ error: "Authentication required" }),
      { 
        status: 401, 
        headers: { "Content-Type": "application/json" } 
      }
    )
  }
}