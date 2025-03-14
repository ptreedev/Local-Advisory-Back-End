import { QueryInterface, Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(
    queryInterface: QueryInterface,
    Sequelize: Sequelize
  ): Promise<void> {
    await queryInterface.bulkInsert("Locations", [
      {
        id: 1,
        name: "Tech Conference Centre",
        addressLine1: "10 Innovation Drive",
        addressLine2: "Building 2",
        city: "London",
        county: "Greater London",
        postCode: "EC1A 1BB",
      },
      {
        id: 2,
        name: "London Art Gallery",
        addressLine1: "50 Regent Street",
        addressLine2: "Gallery Level 3",
        city: "London",
        county: "Greater London",
        postCode: "W1B 5BB",
      },
      {
        id: 3,
        name: "Manchester Music Arena",
        addressLine1: "30 Music Hall Road",
        addressLine2: "",
        city: "Manchester",
        county: "Greater Manchester",
        postCode: "M2 5GD",
      },
      {
        id: 4,
        name: "Business Innovation Hub",
        addressLine1: "15 Business Park",
        addressLine2: "Suite 4B",
        city: "Birmingham",
        county: "West Midlands",
        postCode: "B3 1JE",
      },
      {
        id: 5,
        name: "Cineworld Cinema",
        addressLine1: "123 Oxford Street",
        addressLine2: "Cinema Complex",
        city: "London",
        county: "Greater London",
        postCode: "W1D 2LT",
      },
      {
        id: 6,
        name: "Tech Start-Up Pitch Venue",
        addressLine1: "5 Silicon Way",
        addressLine2: "Tech Park Building A",
        city: "Cambridge",
        county: "Cambridgeshire",
        postCode: "CB1 2AA",
      },
      {
        id: 7,
        name: "Serenity Yoga Retreat",
        addressLine1: "40 Wellness Avenue",
        addressLine2: "Retreat Center",
        city: "Bristol",
        county: "Bristol",
        postCode: "BS1 5TY",
      },
      {
        id: 8,
        name: "London Food Festival",
        addressLine1: "20 Victoria Embankment",
        addressLine2: "Exhibition Hall",
        city: "London",
        county: "Greater London",
        postCode: "EC4Y 0DE",
      },
      {
        id: 9,
        name: "London Fashion Show Arena",
        addressLine1: "25 Fashion Street",
        addressLine2: "Showroom Level 2",
        city: "London",
        county: "Greater London",
        postCode: "E1 6PJ",
      },
      {
        id: 10,
        name: "Charity Gala Ballroom",
        addressLine1: "70 Park Lane",
        addressLine2: "Grand Ballroom",
        city: "London",
        county: "Greater London",
        postCode: "W1K 7AA",
      },
    ]);
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkDelete("Locations", {});
  },
};
