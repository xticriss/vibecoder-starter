import { createClient } from "@libsql/client"
import dotenv from "dotenv"
import path from "path"

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const client = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_URL!.split("?authToken=")[1],
})

async function migrate() {
  console.log("🚀 Starting database migration...")

  try {
    // Create tables
    await client.execute(`
      CREATE TABLE IF NOT EXISTS User (
        id TEXT PRIMARY KEY,
        name TEXT,
        email TEXT NOT NULL UNIQUE,
        image TEXT,
        createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `)

    await client.execute(`
      CREATE TABLE IF NOT EXISTS Post (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT,
        published INTEGER NOT NULL DEFAULT 0,
        createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        authorId TEXT NOT NULL,
        FOREIGN KEY (authorId) REFERENCES User(id) ON DELETE CASCADE
      )
    `)

    console.log("✅ Migration completed successfully!")
  } catch (error) {
    console.error("❌ Migration failed:", error)
    process.exit(1)
  }
}

migrate()