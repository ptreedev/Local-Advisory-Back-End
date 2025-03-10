import { Request, Response, NextFunction } from "express";
import { selectEndpoints, selectUsers } from "../models/model";

export const getApi = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const endpoints = await selectEndpoints();
    res.status(200).send(endpoints);
  } catch (error) {
    next(error);
  }
};

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
