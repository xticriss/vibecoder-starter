import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { loginSchema } from "@/lib/validations"
import { verifyPassword, createToken, createAuthCookie } from "@/lib/auth"
import type { AuthUser } from "@/lib/types"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = loginSchema.parse(body)

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    })

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      )
    }

    // Verify password
    const isPasswordValid = await verifyPassword(validatedData.password, user.password)
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      )
    }

    // Create JWT token
    const token = createToken({
      userId: user.id,
      email: user.email,
    })

    // Prepare user response (exclude password)
    const authUser: AuthUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
    }

    // Create response with cookie
    const response = NextResponse.json(authUser)
    response.headers.set("Set-Cookie", createAuthCookie(token))

    return response
  } catch (error) {
    console.error("[AUTH_LOGIN]", error)
    
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}