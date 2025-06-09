import { PrismaClient } from "@prisma/client"
import dotenv from "dotenv"
import path from "path"

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const prisma = new PrismaClient()

async function seed() {
  console.log("🌱 Starting database seeding...")

  try {
    // Create a test user
    const user = await prisma.user.upsert({
      where: { email: "test@example.com" },
      update: {},
      create: {
        email: "test@example.com",
        name: "Test User",
      },
    })

    // Create test posts
    const post1 = await prisma.post.upsert({
      where: { id: "post_1" },
      update: {},
      create: {
        id: "post_1",
        title: "First Post",
        content: "This is the content of the first post",
        published: true,
        authorId: user.id,
      },
    })

    const post2 = await prisma.post.upsert({
      where: { id: "post_2" },
      update: {},
      create: {
        id: "post_2",
        title: "Second Post",
        content: "This is the content of the second post",
        published: false,
        authorId: user.id,
      },
    })

    console.log("✅ Seeding completed successfully!")
    console.log(`Created user: ${user.id}`)
    console.log(`Created posts: ${post1.id}, ${post2.id}`)
  } catch (error: any) {
    console.error("❌ Seeding failed:", error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seed()