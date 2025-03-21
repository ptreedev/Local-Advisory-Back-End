import "./database/models";
import Express, { NextFunction, Request, Response } from "express";
import {
  getApi,
  getCategories,
  getEventByID,
  getEvents,
  getLocations,
  getUsers,
  patchEvent,
  postEvent,
  postUser,
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
  (req: Request, res: Response) => {
    res.send("authenticated");
  }
);
app.get("/api", getApi);
app.get("/api/users", getUsers);
app.get("/api/events", getEvents);
app.get("/api/event/:id", getEventByID);
app.patch("/api/event/:id", patchEvent);
app.get("/api/locations", getLocations);
app.get("/api/categories", getCategories);
app.post("/api/events/create-event", postEvent);
app.post("/api/register", postUser);

app.post("/api/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ where: { email: email } });
    // If the user does not exist, return a message
    if (!userExists) {
      res.status(422).json({ message: "Incorrect username or passsword" });
    }
    const passwordsMatch = await bcrypt.compare(password, userExists!.password);
    if (!passwordsMatch) {
      res.status(422).json({ message: "Incorrect username or passsword" });
    }
    const jwtToken = jwt.sign(
      { id: userExists?.id, email: userExists?.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );
    res.json({ message: "Hello again!", token: jwtToken });
  } catch (err) {
    console.log(err);
  }
});

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
  res.status(500).send({ msg: "Internal Server Error" });
});

export { app };
