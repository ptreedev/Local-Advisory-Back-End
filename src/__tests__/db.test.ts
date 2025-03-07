import { app } from "../index";
import { testConnection } from "../database/connection";

import request from "supertest";
import { Sequelize } from "sequelize";

describe("GET: /", () => {
  beforeAll(async () => {
    await testConnection.sync({ force: true });
  });

  test("200: Returns all users", async () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        console.log(body);
      });
  });

  afterAll(async () => {
    await testConnection.close();
  });
});
