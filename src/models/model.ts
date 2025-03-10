import { User } from "../database/models/user";
import endpoints from "../../endpoints.json";

export const selectEndpoints = async () => {
  return endpoints;
};

export const selectUsers = async () => {
  const users = await User.findAll();
  return users;
};
