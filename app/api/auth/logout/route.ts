import { NextResponse } from "next/server"
import { clearAuthCookie } from "@/lib/auth"

export async function POST() {
  try {
    // Create response with cleared cookie
    const response = NextResponse.json({ message: "Logged out successfully" })
    response.headers.set("Set-Cookie", clearAuthCookie())

    return response
  } catch (error) {
    console.error("[AUTH_LOGOUT]", error)
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}