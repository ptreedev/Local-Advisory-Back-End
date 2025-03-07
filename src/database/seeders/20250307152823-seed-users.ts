"use strict";

import { DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "John",
          lastName: "Doe",
          email: "johndoe@example.com",
          password: "password123",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Jane",
          lastName: "Smith",
          email: "janesmith@example.com",
          password: "securepassword456",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Alice",
          lastName: "Johnson",
          email: "alicejohnson@example.com",
          password: "mypassword789",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.bulkDelete("Users", {});
  },
};
