import { QueryInterface, Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(
    queryInterface: QueryInterface,
    Sequelize: Sequelize
  ): Promise<void> {
    await queryInterface.bulkInsert("Categories", [
      {
        id: 1,
        name: "Technology",
      },
      {
        id: 2,
        name: "Art",
      },
      {
        id: 3,
        name: "Music",
      },
      {
        id: 4,
        name: "Business",
      },
      {
        id: 5,
        name: "Film",
      },
      {
        id: 6,
        name: "Startups",
      },
      {
        id: 7,
        name: "Wellness",
      },
      {
        id: 8,
        name: "Food",
      },
      {
        id: 9,
        name: "Fashion",
      },
      {
        id: 10,
        name: "Charity",
      },
    ]);
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkDelete("Categories", {});
  },
};
