import { Request, Response, NextFunction } from "express";
import User from "../database/models/user";
import { selectUsers } from "../models/model";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await selectUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
