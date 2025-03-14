"use strict";

import { DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(
    queryInterface: QueryInterface,
    Sequelize: typeof DataTypes
  ): Promise<void> {
    await queryInterface.bulkInsert("Events", [
      {
        name: "Tech Conference 2025",
        description:
          "A gathering of the brightest minds in tech to discuss innovations in AI and software development.",
        dateFrom: new Date("2025-05-01"),
        timeStart: new Date("2025-05-01T09:00:00"),
        timeEnd: new Date("2025-05-01T17:00:00"),
        dateTo: new Date("2025-05-01"),
        image: "tech_conference_2025.jpg",
        locationId: 1,
        ownerId: 1,
      },
      {
        name: "Art Exhibition",
        description:
          "An exhibition showcasing the works of local contemporary artists.",
        dateFrom: new Date("2025-06-10"),
        timeStart: new Date("2025-06-10T10:00:00"),
        timeEnd: new Date("2025-06-10T18:00:00"),
        dateTo: new Date("2025-06-12"),
        image: "art_exhibition.jpg",
        locationId: 2,
        ownerId: 1,
      },
      {
        name: "Music Festival",
        description:
          "A weekend-long music festival featuring live performances from top artists.",
        dateFrom: new Date("2025-07-15"),
        timeStart: new Date("2025-07-15T12:00:00"),
        timeEnd: new Date("2025-07-15T22:00:00"),
        dateTo: new Date("2025-07-17"),
        image: "music_festival_2025.jpg",
        locationId: 3,
        ownerId: 1,
      },
      {
        name: "Annual Business Summit",
        description:
          "A summit for entrepreneurs and business owners to network and discuss industry trends.",
        dateFrom: new Date("2025-08-20"),
        timeStart: new Date("2025-08-20T08:00:00"),
        timeEnd: new Date("2025-08-20T18:00:00"),
        dateTo: new Date("2025-08-20"),
        image: "business_summit.jpg",
        locationId: 4,
        ownerId: 1,
      },
      {
        name: "Film Premiere Night",
        description:
          "A glamorous evening showcasing the latest blockbuster release.",
        dateFrom: new Date("2025-09-10"),
        timeStart: new Date("2025-09-10T19:00:00"),
        timeEnd: new Date("2025-09-10T23:00:00"),
        dateTo: new Date("2025-09-10"),
        image: "film_premiere_night.jpg",
        locationId: 5,
        ownerId: 1,
      },
      {
        name: "Startup Pitch Event",
        description:
          "Young entrepreneurs pitch their startup ideas to potential investors.",
        dateFrom: new Date("2025-10-01"),
        timeStart: new Date("2025-10-01T10:00:00"),
        timeEnd: new Date("2025-10-01T14:00:00"),
        dateTo: new Date("2025-10-01"),
        image: "startup_pitch_event.jpg",
        locationId: 6,
        ownerId: 1,
      },
      {
        name: "Yoga Retreat",
        description:
          "A relaxing retreat designed to promote physical and mental wellness through yoga.",
        dateFrom: new Date("2025-11-05"),
        timeStart: new Date("2025-11-05T08:00:00"),
        timeEnd: new Date("2025-11-05T17:00:00"),
        dateTo: new Date("2025-11-07"),
        image: "yoga_retreat_2025.jpg",
        locationId: 7,
        ownerId: 1,
      },
      {
        name: "Food Festival",
        description:
          "A celebration of the best local and international cuisines.",
        dateFrom: new Date("2025-12-10"),
        timeStart: new Date("2025-12-10T11:00:00"),
        timeEnd: new Date("2025-12-10T21:00:00"),
        dateTo: new Date("2025-12-12"),
        image: "food_festival_2025.jpg",
        locationId: 8,
        ownerId: 1,
      },
      {
        name: "Fashion Show 2025",
        description:
          "A showcase of the latest fashion trends by leading designers.",
        dateFrom: new Date("2025-01-15"),
        timeStart: new Date("2025-01-15T18:00:00"),
        timeEnd: new Date("2025-01-15T22:00:00"),
        dateTo: new Date("2025-01-15"),
        image: "fashion_show_2025.jpg",
        locationId: 9,
        ownerId: 1,
      },
      {
        name: "Charity Gala",
        description:
          "A fundraising event for a local charity, with live entertainment and auctions.",
        dateFrom: new Date("2025-02-20"),
        timeStart: new Date("2025-02-20T19:00:00"),
        timeEnd: new Date("2025-02-20T23:00:00"),
        dateTo: new Date("2025-02-20"),
        image: "charity_gala_2025.jpg",
        locationId: 10,
        ownerId: 1,
      },
    ]);
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkDelete("Events", {});
  },
};
