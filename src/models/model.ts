import { User } from "../database/models/user";
import endpoints from "../../endpoints.json";
import bcrypt from "bcrypt";
import { Event } from "../database/models/events";
import { Location } from "../database/models/location";
import { Category } from "../database/models/category";
import { ParsedQs } from "qs";

export const selectEndpoints = async () => {
  return endpoints;
};

export const selectUsers = async () => {
  const users = await User.findAll();
  return users;
};

export const selectEvents = async (
  category: string | ParsedQs | (string | ParsedQs)[] | undefined
) => {
  try {
    if (category) {
      const filterEvents = await Event.findAll({
        include: [
          {
            model: Category,
            as: "category",
            where: { name: category },
            attributes: ["name", "id"],
            through: {
              attributes: [],
            },
          },
        ],
      });
      return filterEvents;
    } else {
      const events = await Event.findAll();
      return events;
    }
  } catch (err) {
    console.log(err);
  }
};

export const selectLocations = async () => {
  const locations = await Location.findAll();
  return locations;
};

export const selectCategories = async () => {
  const categories = await Category.findAll();
  return categories;
};

export const createUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  if (
    await User.findOne({
      where: { email: email },
    })
  ) {
    const err = new Error(
      "There was an unexpected error with that email, please try again"
    );
    err.name = "ValidationError";
    throw err;
  } else {
    const hashedPassword: string = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });
    return newUser;
  }
};

export const createEvent = async (
  name: string,
  description: string,
  dateFrom: string,
  dateTo: string,
  timeStart: string,
  timeEnd: string,
  locationId: number,
  ownerId: number,
  image: string
) => {
  try {
    const newEvent = await Event.create({
      name: name,
      description: description,
      dateFrom: new Date(dateFrom),
      dateTo: new Date(dateTo),
      timeStart: new Date(timeStart),
      timeEnd: new Date(timeEnd),
      locationId: 1,
      ownerId: ownerId,
      image: image,
    });
    return newEvent;
  } catch (err) {
    console.log(err);
  }
};
