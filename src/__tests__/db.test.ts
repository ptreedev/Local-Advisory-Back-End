import { app } from "../index";
import { sequelizeConnection } from "../database/connection";
import request from "supertest";
import { exec } from "child_process";
import util from "util";
import seedUsers from "../database/seeders/20250307152709-seed-users";
import User from "../database/models/user";

describe("GET: /", () => {
  beforeAll(async () => {
    await sequelizeConnection.sync({ force: true });
    await seedUsers.up(sequelizeConnection.getQueryInterface(), sequelizeConnection);
  });

  test("200: Returns all users", async () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        console.log(body);
      }).catch((error) => {
        console.log(error);
      });
  });

  afterAll(async () => {
    await sequelizeConnection.close();
  });
});
