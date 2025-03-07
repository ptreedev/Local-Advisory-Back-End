import User from "../database/models/user";

export const selectUsers = async () => {
  const users = await User.findAll();
  return users;
};
