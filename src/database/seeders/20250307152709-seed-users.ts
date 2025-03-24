import { QueryInterface, Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(
    queryInterface: QueryInterface,
    Sequelize: Sequelize
  ): Promise<void> {
    await queryInterface.bulkInsert("Users", [
      {
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice@example.com",
        password: "$2b$10$abcdefghijklmnopqrstuv", // Replace with a hashed password in real use
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 1,
      },
      {
        firstName: "Bob",
        lastName: "Smith",
        email: "bob@example.com",
        password: "$2b$10$abcdefghijklmnopqrstuv",
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 2,
      },
      {
        firstName: "Charlie",
        lastName: "Brown",
        email: "charlie@example.com",
        password: "$2b$10$abcdefghijklmnopqrstuv",
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 2,
      },
      {
        firstName: "User",
        lastName: "User",
        email: "user@user.com",
        password:
          "$2b$10$di.Dq.siIrfg4v.bhJgDaOE25Jng51nkz3VxdA1geGXVrKAiTOJIC",
        roleId: 2,
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    ]);
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkDelete("Users", {}); // Use "Users", not "User"
  },
};
