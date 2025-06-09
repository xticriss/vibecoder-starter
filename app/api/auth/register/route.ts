import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { registerSchema } from "@/lib/validations"
import { hashPassword, createToken, createAuthCookie } from "@/lib/auth"
import type { AuthUser } from "@/lib/types"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = registerSchema.parse(body)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(validatedData.password)

    // Create user
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
      },
    })

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
    const response = NextResponse.json(authUser, { status: 201 })
    response.headers.set("Set-Cookie", createAuthCookie(token))

    return response
  } catch (error) {
    console.error("[AUTH_REGISTER]", error)
    
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      )
    }

    // Handle unique constraint violation
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}