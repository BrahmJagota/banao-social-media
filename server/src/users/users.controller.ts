import { Request, Response } from 'express';
import { createUserService, getUsersService } from './users.service';

export const createUser = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;
  const user = await createUserService({ fullName, email, password });
  res.status(201).json(user);
};

export const getAllUsers = async (_: Request, res: Response) => {
  const users = await getUsersService();
  res.json(users);
};
