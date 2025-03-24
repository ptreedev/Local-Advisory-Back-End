import { QueryInterface, Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(
    queryInterface: QueryInterface,
    Sequelize: Sequelize
  ): Promise<void> {
    await queryInterface.bulkInsert("Locations", [
      {
        name: "Tech Conference Centre",
        addressLine1: "10 Innovation Drive",
        addressLine2: "Building 2",
        city: "London",
        county: "Greater London",
        postCode: "EC1A 1BB",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "London Art Gallery",
        addressLine1: "50 Regent Street",
        addressLine2: "Gallery Level 3",
        city: "London",
        county: "Greater London",
        postCode: "W1B 5BB",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Manchester Music Arena",
        addressLine1: "30 Music Hall Road",
        addressLine2: "",
        city: "Manchester",
        county: "Greater Manchester",
        postCode: "M2 5GD",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Business Innovation Hub",
        addressLine1: "15 Business Park",
        addressLine2: "Suite 4B",
        city: "Birmingham",
        county: "West Midlands",
        postCode: "B3 1JE",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Cineworld Cinema",
        addressLine1: "123 Oxford Street",
        addressLine2: "Cinema Complex",
        city: "London",
        county: "Greater London",
        postCode: "W1D 2LT",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Tech Start-Up Pitch Venue",
        addressLine1: "5 Silicon Way",
        addressLine2: "Tech Park Building A",
        city: "Cambridge",
        county: "Cambridgeshire",
        postCode: "CB1 2AA",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Serenity Yoga Retreat",
        addressLine1: "40 Wellness Avenue",
        addressLine2: "Retreat Center",
        city: "Bristol",
        county: "Bristol",
        postCode: "BS1 5TY",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "London Food Festival",
        addressLine1: "20 Victoria Embankment",
        addressLine2: "Exhibition Hall",
        city: "London",
        county: "Greater London",
        postCode: "EC4Y 0DE",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "London Fashion Show Arena",
        addressLine1: "25 Fashion Street",
        addressLine2: "Showroom Level 2",
        city: "London",
        county: "Greater London",
        postCode: "E1 6PJ",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Charity Gala Ballroom",
        addressLine1: "70 Park Lane",
        addressLine2: "Grand Ballroom",
        city: "London",
        county: "Greater London",
        postCode: "W1K 7AA",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkDelete("Locations", {});
  },
};
