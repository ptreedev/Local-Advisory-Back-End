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
  patchRole,
  postEvent,
  postUser,
  registerEvent,
} from "./controllers/controller";
import bodyParser from "body-parser";
import { authorizeRole } from "./auth/authorize-roles";

import passportStrategy from "./auth/passport";
import passport from "passport";
import { error } from "console";

const app = Express();

passportStrategy(passport);
app.use(passport.initialize());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(Express.json());
//public endpoints
app.post("/api/login", loginUser);
app.post("/api/register", postUser);
app.get("/api/events", getEvents);
app.get("/api/event/:id", getEventByID);
app.patch("/api/event/:id", patchEvent);
app.get("/api/locations", getLocations);
app.get("/api/categories", getCategories);
app.get("/api", getApi);
// protected endpoints
app.get(
  "/api/user",
  passport.authenticate("jwt", { session: false }),
  authorizeRole(1, 2),
  getUser
);
app.get(
  "/api/users",
  passport.authenticate("jwt", { session: false }),
  authorizeRole(1),
  getUsers
);
app.post(
  "/api/events/create-event",
  passport.authenticate("jwt", { session: false }),
  authorizeRole(1),
  postEvent
);
app.patch(
  "/api/user/register-event",
  passport.authenticate("jwt", { session: false }),
  authorizeRole(1),
  registerEvent
);

app.patch(
  "/api/user/role",
  passport.authenticate("jwt", { session: false }),
  authorizeRole(1),
  patchRole
);
// errors
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
  console.log(error);
  res.status(500).send({ msg: "Internal Server Error" });
});

export { app };
