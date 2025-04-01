import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const prisma = new PrismaClient();

const connectDB = async () => {
  try {
    await prisma.$connect(); 
    console.log("Db Connected...");
  } catch (err) {
    console.error("Db Connection Error:", err);
  }
};
 
export { prisma, connectDB };
