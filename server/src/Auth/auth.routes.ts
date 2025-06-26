import { Router, Response, Request } from "express";
import { registerUser, loginUser } from "./auth.controller";
import { AuthenticatedRequest, authenticateUser } from "../middleware/authMiddleware";
import { UserModel } from "../database/models";
import bcrypt from "bcryptjs/umd/types";
import { JWT_SECRET_KEY } from "../environments";
import jwt from "jsonwebtoken";

const authRouter = Router();



authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);


authRouter.get("/me", authenticateUser, async (req: AuthenticatedRequest, res: Response) => {
  res.json({ userId: req.userId });
});


const testFunction = (req: Request, res: Response) => {
  console.log("routes are working")
  res.send("hello")
}
  
  authRouter.get("/test", testFunction);

export default authRouter;
