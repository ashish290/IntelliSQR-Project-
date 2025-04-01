import express, { Request, Response, Application } from "express";
import { AuthRouter } from "../router/AuthRouter";

export default async (app: Application) => {
  try {

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use("/auth", AuthRouter);
    
    app.use("/", (req: Request, res: Response) => {
      res.json({ msg: "Express working..." });
    });

  } catch (error) {
    console.log("Express Error :", error);
  }
};