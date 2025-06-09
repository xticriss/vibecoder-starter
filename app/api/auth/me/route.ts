import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getTokenFromCookies, verifyToken } from "@/lib/auth"
import type { AuthUser } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    // Get token from cookies
    const cookieHeader = request.headers.get("cookie")
    const token = getTokenFromCookies(cookieHeader)

    if (!token) {
      return NextResponse.json(
        { error: "No authentication token found" },
        { status: 401 }
      )
    }

    // Verify token
    const payload = verifyToken(token)
    
    if (!payload) {
      return NextResponse.json(
        { error: "Invalid authentication token" },
        { status: 401 }
      )
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 401 }
      )
    }

    // Prepare user response (exclude password)
    const authUser: AuthUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
    }

    return NextResponse.json(authUser)
  } catch (error) {
    console.error("[AUTH_ME]", error)
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}