import { Response, Request, Router } from "express";
import {
  UserLogin,
  UserLogout,
  UserSignup,
} from "../controllers/AuthController";
import { Authenticate } from "../middleware";

const router = Router();

router.post("/login", UserLogin);
router.post("/signup", UserSignup);
router.post("/logout", Authenticate, UserLogout);

router.get("/", (req: Request, res: Response) => {
  res.json({ msg: "Auth working..." });
});

export { router as AuthRouter };
