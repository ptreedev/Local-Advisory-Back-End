import { Request, Response, NextFunction } from "express";
import {
  createEvent,
  createUser,
  selectCategories,
  selectEndpoints,
  selectEvents,
  selectLocations,
  selectUsers,
} from "../models/model";
import { time } from "console";

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

export const getEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { category } = req.query;
    const events = await selectEvents(category);
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

export const getLocations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const loactions = await selectLocations();
    res.status(200).json(loactions);
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await selectCategories();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export const postUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const newUser = await createUser(firstName, lastName, email, password);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const postEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      description,
      dateFrom,
      dateTo,
      timeStart,
      timeEnd,
      locationId,
      ownerId,
      image,
    } = req.body;
    console.log(req.body);
    const newEvent = await createEvent(
      name,
      description,
      dateFrom,
      dateTo,
      timeStart,
      timeEnd,
      locationId,
      ownerId,
      image
    );
    res.status(201).json(newEvent);
  } catch (err) {
    console.log(err);
  }
};
