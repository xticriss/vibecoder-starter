import dotenv from "dotenv"
import path from "path"

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

import { prisma } from "../lib/db"

async function main() {
  const user = await prisma.user.create({
    data: {
      email: "test@example.com",
      name: "Test User",
      posts: {
        create: [
          {
            title: "First Post",
            content: "This is the content of the first post",
            published: true,
          },
          {
            title: "Second Post",
            content: "This is the content of the second post",
            published: false,
          },
        ],
      },
    },
  })

  console.log({ user })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })