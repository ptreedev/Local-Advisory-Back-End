import { QueryInterface, Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(
    queryInterface: QueryInterface,
    Sequelize: Sequelize
  ): Promise<void> {
    await queryInterface.bulkInsert("Categories", [
      {
        name: "Technology",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Art",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Music",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Business",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Film",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Startups",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Wellness",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Food",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Fashion",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Charity",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkDelete("Categories", {});
  },
};
