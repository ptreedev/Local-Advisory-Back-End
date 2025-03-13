import { app } from "../index";
import { sequelizeConnection } from "../database/connection";
import request from "supertest";
import seedUsers from "../database/seeders/20250307152709-seed-users";
import { UserAttributes } from "../database/models/user";
import endpoints from "../../endpoints.json";

beforeAll(async () => {
  await sequelizeConnection.sync({ force: true });
  await seedUsers.up(
    sequelizeConnection.getQueryInterface(),
    sequelizeConnection
  );
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
        console.log(data.body);
        expect(data.body).toBe({
          msg: "Invalid request, check submitted fields",
        });
      });
  });
});
