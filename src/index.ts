import "./database/models";
import Express, { NextFunction, Request, Response } from "express";
import { getApi, getUsers, postUser } from "./controllers/controller";

const app = Express();
app.use(Express.json());

app.get("/api", getApi);
app.get("/api/users", getUsers);
app.post("/api/user", postUser);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "URL not found" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (
    err.message ===
    "There was an unexpected error with that email, please try again"
  ) {
    res.status(422).send("Invalid request, check submitted fields");
  }
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({ msg: "Internal Server Error" });
});

// app.get("/", async (req, res) => {
//   const user = await User.create({
//     firstName: "John",
//     lastName: "Smith",
//     email: "john@smith.co.uk",
//     password: "johnsmith1",
//   });
//   const location = await Location.create({
//     name: "First Direct",
//     addressLine1: "12 Here Street",
//     addressLine2: "Manchester",
//     city: "Manchester",
//     postCode: "M1 2TB",
//     county: "Greater Manchester",
//   });
//   const music = await Category.create({
//     name: "Music",
//   });
//   const event = await Event.create({
//     name: "NewEvent",
//     description: "",
//     dateFrom: new Date(),
//     ownerId: user.id,
//     timeStart: new Date(),
//     locationId: location.id,
//   });
//   await event.addAttendee(user);
//   await event.addCategory(music);
//   res.send(
//     await Event.findOne({
//       where: {
//         id: event.id,
//       },
//       include: [Location, "attendees", "category"],
//     })
//   );
// });

export { app };
