import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Express from "./services/Express";
import cookieParser from "cookie-parser";
import { connectDB } from "./services/Database";

dotenv.config();

try {
  const StartServer = async () => {
    const app = express();
    const PORT = process.env.PORT;

    app.use(cookieParser());
    app.use(cors());

    await connectDB();
    await Express(app);

    app.listen(PORT, () => {
      console.log(`Server is running on : ${PORT}`);
    });
  };
  StartServer();
} catch (error) {
  console.log("Server Error :", error);
}
