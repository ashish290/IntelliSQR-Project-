import { Request, Response } from "express";
import { LoginValidation, SignUpValidation } from "../dto";
import { GeneratePassword, GenerateSalt, GenerateSignature } from "../utils";
import { prisma } from "../services/Database";

export const UserLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = <LoginValidation>req.body;
    if (!email || !password) {
      res.status(400).json({ required: "Email and Password are required" });
      return;
    }
    const exisitingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (exisitingUser) {
      console.log("User found:", exisitingUser);
      const ExistPassword = exisitingUser.password;
      const salt = exisitingUser.salt;
      if (!ExistPassword || !salt) {
        res.status(500).json({ error: "User password or salt is missing" });
        return;
      }
      const isPasswordValid = await GeneratePassword(password, salt);
      if (isPasswordValid === ExistPassword) {
        const signature = await GenerateSignature({
          id: exisitingUser.id,
          email: exisitingUser.email,
        });
        console.log("Signature:", signature);
        res.cookie("jwt", signature, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 1000 * 60 * 60 * 24 * 7,
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        });
        res.status(200).json({
          user: {
            id: exisitingUser.id,
            email: exisitingUser.email,
          },
          success: "User logged in successfully",
          signature: signature,
        });
      } else {
        res.status(401).json({ error: "Invalid password" });
        return;
      }
    } else {
      res.status(400).json({ error: "User not found" });
      return;
    }
  } catch (error) {
    console.log("Login Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};

export const UserSignup = async (req: Request, res: Response) => {
  try {
    const { email, password } = <SignUpValidation>req.body;
    if (!email || !password) {
      res.status(400).json({ required: "All field are required" });
      return;
    }
    const exisitingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (exisitingUser) {
      res.status(400).json({ error: "User already exists" });
      return;
    } else {
      const salt = await GenerateSalt();
      const hashedPassword = await GeneratePassword(password, salt);
      const newUser = await prisma.user.create({
        data: {
          email: email,
          password: hashedPassword,
          salt: salt,
        },
      });
      if (newUser) {
        const signature = await GenerateSignature({
          id: newUser.id,
          email: newUser.email,
        });
        console.log(process.env.NODE_ENV);
        res.cookie("jwt", signature, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 1000 * 60 * 60 * 24 * 7,
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        });
        
        res.status(201).json({
          user: {
            id: newUser.id,
            email: newUser.email,
          },
          success: "User created successfully",
          signature: signature,
        });
      }
    }
  } catch (error) {
    console.log("Signup Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};

export const UserLogout = async (req: Request, res: Response) => {
  try {
    if (res) {
      res.cookie("jwt", "", { maxAge: 1, secure: true, sameSite: "none" });
      res.status(200).json({ success: "User Logout Successfully..." });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
