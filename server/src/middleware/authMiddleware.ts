import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../environments";

if (!JWT_SECRET_KEY) {
  console.error("JWT_SECRET_KEY is not set. Authentication will fail.");
}

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const authenticateUser = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Unauthorized: No token provided" });
      return;
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET_KEY) as { userId: string; [key: string]: any };

    req.userId = decoded.userId;

    next();
  } catch (err) {
     res.status(401).json({ message: "Unauthorized: Token verification failed" });
  }
};
