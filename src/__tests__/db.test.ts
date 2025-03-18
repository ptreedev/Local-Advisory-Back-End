import { app } from "../index";
import { sequelizeConnection } from "../database/connection";
import request from "supertest";
import seedUsers from "../database/seeders/20250307152709-seed-users";
import seedEvents from "../database/seeders/20250314101101-events";
import seedCategories from "../database/seeders/20250313105814-categories";
import seedLocations from "../database/seeders/20250313105547-locations";
import endpoints from "../../endpoints.json";
import { UserAttributes } from "../database/models/user";
import { Event, EventAttributes } from "../database/models/events";
import { Category, CategoryAttributes } from "../database/models/category";
import { LocationAttributes } from "../database/models/location";

beforeAll(async () => {
  try {
    await sequelizeConnection.sync({ force: true });
    await seedUsers.up(
      sequelizeConnection.getQueryInterface(),
      sequelizeConnection
    );
    await seedCategories.up(
      sequelizeConnection.getQueryInterface(),
      sequelizeConnection
    );
    await seedLocations.up(
      sequelizeConnection.getQueryInterface(),
      sequelizeConnection
    );
    await seedEvents.up(
      sequelizeConnection.getQueryInterface(),
      sequelizeConnection
    );
  } catch (err) {
    console.log(err);
  }
});
afterAll(async () => {
  await sequelizeConnection.close();
});

describe("GET: /api", () => {
  test("200: Returns all endpoints", async () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(endpoints);
      });
  });
});
describe("GET: /api/users", () => {
  test("200: Returns all users", async () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        body.forEach((user: UserAttributes) => {
          expect(user).toMatchObject({
            id: expect.any(Number),
            firstName: expect.any(String),
            lastName: expect.any(String),
            email: expect.any(String),
            password: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          });
        });
      });
  });
});

describe("GET: /api/events", () => {
  test("200: returns a list of events", async () => {
    return request(app)
      .get("/api/events")
      .expect(200)
      .then(({ body }) => {
        body.forEach((event: EventAttributes) => {
          expect(event).toMatchObject({
            name: expect.any(String),
            description: expect.any(String),
            dateFrom: expect.any(String),
            timeStart: expect.any(String),
            timeEnd: expect.any(String),
            dateTo: expect.any(String),
            image: expect.any(String),
            LocationId: expect.any(Number),
            ownerId: expect.any(Number),
          });
        });
      });
  });
});

describe("GET: /api/loactions", () => {
  test("200: returns a list of locations", async () => {
    return request(app)
      .get("/api/locations")
      .expect(200)
      .then(({ body }) => {
        body.forEach((location: LocationAttributes) => {
          expect(location).toMatchObject({
            id: expect.any(Number),
            name: expect.any(String),
            addressLine1: expect.any(String),
            addressLine2: expect.any(String),
            city: expect.any(String),
            county: expect.any(String),
            postCode: expect.any(String),
          });
        });
      });
  });
});

describe("GET: /api/categories", () => {
  test("200: returns a list of categories", async () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        body.forEach((category: CategoryAttributes) => {
          expect(category).toMatchObject({
            id: expect.any(Number),
            name: expect.any(String),
          });
        });
      });
  });
});

describe("GET: /api/events?category=:category", () => {
  test("200: returns a list of events filtered by category", async () => {
    try {
      const musicEvent = await Event.findOne({
        where: { id: 3 },
        include: "category",
      });
      const foundCategory = await Category.findOne({
        where: { name: "Music" },
      });
      await musicEvent!.addCategory(foundCategory as Category);
    } catch (err) {
      console.log(err);
    }

    return request(app)
      .get("/api/events?category=Music")
      .expect(200)
      .then(({ body }): void => {
        body.forEach((event: Event) => {
          expect(event).toMatchObject({
            id: 3,
            name: expect.any(String),
            description: expect.any(String),
            dateFrom: expect.any(String),
            timeStart: expect.any(String),
            timeEnd: expect.any(String),
            dateTo: expect.any(String),
            image: expect.any(String),
            LocationId: 3,
            ownerId: 1,
            category: [{ name: "Music", id: 3 }],
          });
        });
      });
  });
});

describe("Non-existent endpoint", () => {
  test("404: responds with an appropriate message when an incorrect url is used", async () => {
    return request(app)
      .get("/api/use")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("URL not found");
      });
  });
});

describe("POST: /api/register", () => {
  test("201: Creates new user and stores hashed password", async () => {
    const newUser = {
      firstName: "Test",
      lastName: "User",
      email: "testuser@user.com",
      password: "test1234",
    };
    return request(app)
      .post("/api/register")
      .send(newUser)
      .expect(201)
      .then(({ body }) => {
        expect(body).toMatchObject({
          id: 4,
          firstName: "Test",
          lastName: "User",
          email: "testuser@user.com",
          password: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        });
        expect(body.password).not.toBe(newUser.password);
      });
  });
  test("422: returns a validation error if email already exists ", () => {
    const newUser = {
      firstName: "Test",
      lastName: "User",
      email: "alice@example.com",
      password: "test1234",
    };
    return request(app)
      .post("/api/register")
      .send(newUser)
      .expect(422)
      .then((data) => {
        expect(data.body).toEqual({
          msg: "Invalid request, check submitted fields",
        });
      });
  });
});
