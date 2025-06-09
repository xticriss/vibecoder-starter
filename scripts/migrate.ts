import { execSync } from "child_process"
import dotenv from "dotenv"
import path from "path"

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

async function migrate() {
  console.log("🚀 Starting database migration...")

  try {
    // Use Prisma to push schema to database
    console.log("📋 Pushing schema to database...")
    execSync("npx prisma db push", { stdio: "inherit" })
    
    console.log("🔄 Generating Prisma client...")
    execSync("npx prisma generate", { stdio: "inherit" })
    
    console.log("✅ Migration completed successfully!")
  } catch (error) {
    console.error("❌ Migration failed:", error)
    process.exit(1)
  }
}

migrate()