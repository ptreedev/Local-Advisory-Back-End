import "./database/models";
import Express, { NextFunction, Request, Response } from "express";
import {
  getApi,
  getCategories,
  getEventByID,
  getEvents,
  getLocations,
  getUser,
  getUsers,
  loginUser,
  patchEvent,
  postEvent,
  postUser,
  registerEvent,
} from "./controllers/controller";
import bodyParser from "body-parser";
import { User } from "./database/models/user";
import { Event } from "./database/models/events";
import { Location } from "./database/models/location";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import passportStrategy from "./auth/passport";
import passport from "passport";

const app = Express();

passportStrategy(passport);
app.use(passport.initialize());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(Express.json());

app.get(
  "/api/user",
  passport.authenticate("jwt", { session: false }),
// getUser,
  (req: Request, res: Response) => {
    const user = req.user; 
    console.log(user?.id); 
    res.json(req.user);
  }
);
app.post("/api/login", loginUser);
app.post("/api/register", postUser);

app.get("/api", getApi);
app.get("/api/users", getUsers);
app.get("/api/events", getEvents);
app.get("/api/event/:id", getEventByID);
app.patch("/api/event/:id", patchEvent);
app.get("/api/locations", getLocations);
app.get("/api/categories", getCategories);
app.post("/api/events/create-event", postEvent);
app.patch("/api/user/register-event", registerEvent);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "URL not found" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (
    err.message ===
    "There was an unexpected error with that email, please try again"
  ) {
    res.status(422).send({ msg: "Invalid request, check submitted fields" });
  } else next(err);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err.message === "Event not found") {
    res.status(404).send({ msg: "Event not found" });
  } else next(err);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err.message === "Invalid ID") {
    res.status(400).send({ msg: "Bad Request" });
  } else next(err);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err.message === "Invalid username or password") {
    res.status(422).send({ msg: "Invalid username or passsword" });
  } else next(err);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({ msg: "Internal Server Error" });
});

export { app };
