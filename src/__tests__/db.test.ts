import { app } from "../index";
import { testConnection } from "../database/connection";

import request from "supertest";
import { Sequelize } from "sequelize";

describe("GET: /", () => {
  beforeAll(async () => {
    await testConnection.sync({ force: true });
  });

  test("200: Returns Test Database", async () => {
    return request(app)
      .get("/")
      .expect(200)
      .then(({ body }) => {
        console.log(body);
      });
  });

  afterAll(async () => {
    await testConnection.close();
  });
});
