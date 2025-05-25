import { createClient } from "@libsql/client"
import dotenv from "dotenv"
import path from "path"

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const client = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_URL!.split("?authToken=")[1],
})

async function seed() {
  console.log("🌱 Starting database seeding...")

  try {
    // Generate a unique ID (simple version)
    const userId = `user_${Date.now()}`
    const postId1 = `post_${Date.now()}_1`
    const postId2 = `post_${Date.now()}_2`

    // Create a test user
    await client.execute({
      sql: `INSERT INTO User (id, email, name, createdAt, updatedAt) VALUES (?, ?, ?, datetime('now'), datetime('now'))`,
      args: [userId, "test@example.com", "Test User"]
    })

    // Create test posts
    await client.execute({
      sql: `INSERT INTO Post (id, title, content, published, authorId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
      args: [postId1, "First Post", "This is the content of the first post", 1, userId]
    })

    await client.execute({
      sql: `INSERT INTO Post (id, title, content, published, authorId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
      args: [postId2, "Second Post", "This is the content of the second post", 0, userId]
    })

    console.log("✅ Seeding completed successfully!")
    console.log(`Created user: ${userId}`)
    console.log(`Created posts: ${postId1}, ${postId2}`)
  } catch (error: any) {
    if (error.message?.includes("UNIQUE constraint failed")) {
      console.log("⚠️  Test data already exists in the database")
    } else {
      console.error("❌ Seeding failed:", error)
      process.exit(1)
    }
  }
}

seed()