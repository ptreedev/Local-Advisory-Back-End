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
            locationId: expect.any(Number),
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
            locationId: 3,
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

describe("POST: /api/events/create-event", () => {
  test("201: Creates a new event and returns the created event", async () => {
    const newEvent = {
      name: "Test Event",
      description: "Testing Events",
      dateFrom: "2025-05-01",
      timeStart: "2025-05-01T09:00:00",
      timeEnd: "2025-05-01T17:00:00",
      dateTo: "2025-05-01",
      image: "test.jpg",
      locationId: 1,
      ownerId: 1,
    };
    return request(app)
      .post("/api/events/create-event")
      .send(newEvent)
      .expect(201)
      .then(({ body }): void => {
        expect(body).toMatchObject({
          name: "Test Event",
          description: "Testing Events",
          dateFrom: expect.any(String),
          timeStart: expect.any(String),
          timeEnd: expect.any(String),
          dateTo: expect.any(String),
          image: "test.jpg",
          locationId: 1,
          ownerId: 1,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        });
      });
  });
});

describe("GET: /api/event/:id", () => {
  test("200: returns an event by ID", async () => {
    return request(app)
      .get("/api/event/1")
      .expect(200)
      .then(({ body }) => {
        expect(body).toMatchObject({
          id: 1,
          name: "Tech Conference 2025",
          description:
            "A gathering of the brightest minds in tech to discuss innovations in AI and software development.",
          dateFrom: expect.any(String),
          timeStart: expect.any(String),
          timeEnd: expect.any(String),
          dateTo: expect.any(String),
          image: "tech_conference_2025.jpg",
          locationId: 1,
          ownerId: 1,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        });
      });
  });
  test("404: responds with appropriate status and msg when given a valid id but non-existent id", () => {
    return request(app)
      .get("/api/event/999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Event not found");
      });
  });
  test("400: sends and appropriate status and error message when given an ivalid id", () => {
    return request(app)
      .get("/api/event/banana")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
});

describe("PATCH: /api/event/:id", () => {
  test("200: updates event", async () => {
    const updateEvent = {
      name: "Changing Event Name",
      description: "A mighty fine event",
      locationId: 2,
      dateFrom: "2025-06-02",
      dateTo: "2025-06-03",
      image: "a new image.jpg",
      timeStart: "2025-06-02T10:00:00",
      timeEnd: "2025-06-02T15:30:00",
    };
    return request(app)
      .patch("/api/event/1")
      .send(updateEvent)
      .expect(200)
      .then(({ body }) => {
        expect(body).toMatchObject({
          id: 1,
          name: "Changing Event Name",
          description: "A mighty fine event",
          image: "a new image.jpg",
          dateFrom: "2025-06-02T00:00:00.000Z",
          dateTo: "2025-06-03T00:00:00.000Z",
          timeStart: "2025-06-02T09:00:00.000Z",
          timeEnd: "2025-06-02T14:30:00.000Z",
          ownerId: 1,
          locationId: 2,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        });
      });
  });
});
