import { NextFunction, Request, Response } from "express";
import { AuthSignature } from "../dto";
import { validateSignature } from "../utils";

declare global {
  namespace Express {
    interface Request {
      user: AuthSignature;
    }
  }
}

export const Authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const valid = await validateSignature(req);
    console.log("Valid Signature:", valid);
    if (valid) {
      next();
    } else {
      res.json({ msg: "User not Authrized" });
      return;
    }
  } catch (error) {
    console.log("Middleware Error :", error);
  }
};
