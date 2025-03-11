import { User } from "../database/models/user";
import endpoints from "../../endpoints.json";
import bcrypt from "bcrypt";
import { error } from "console";

export const selectEndpoints = async () => {
  return endpoints;
};

export const selectUsers = async () => {
  const users = await User.findAll();
  return users;
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
    return { msg: "e-mail already in use" };
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
