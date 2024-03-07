import { PrismaClient } from "@prisma/client";
import { fieldEncryptionExtension } from 'prisma-field-encryption'

// declare global {
// 	var prisma: PrismaClient | undefined;
// }

// // const prisma = global.prisma || new PrismaClient({ log: ["info"] });
// const prisma = global.prisma || new PrismaClient({ log: ["info"] });
// // if (process.env.NODE_ENV !== "production") global.prisma = prisma;

// export default prisma;

const globalClient = new PrismaClient()

export const prisma = globalClient.$extends(
  // This is a function, don't forget to call it:
  fieldEncryptionExtension()
)