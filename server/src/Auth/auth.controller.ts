import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../environments";
import { HobbyModel, UserModel } from "../database/models";

export const registerUser = async (req: Request, res: Response) => {
  const { email, password, fullName, hobbies } = req.body;
  console.log(email, password, fullName, hobbies)

  if (!email || !password) {
    res.status(400).json({ message: "Email and password required" });
    return;
  }
  const existing = await UserModel.findOne({ email });
  if (existing) {
    res.status(409).json({ message: "User already exists" });
    return;
  }

    
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await UserModel.create({ email, password: hashedPassword, fullName, hobbies });

  const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, {
    expiresIn: "24h",
  });

  res.status(201).json({ token });
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) {
    res.status(404).json({ message: "Invalid credentials" });
    return;
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, {
    expiresIn: "1h",
  });

  res.json({ token });
};
