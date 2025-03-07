import { app } from "../index";
import { sequelizeConnection } from "../database/connection";
import util from "util";
import { exec } from "child_process";
import request from "supertest";

beforeAll(async () => {
  await sequelizeConnection.sync({ force: true });
  await util.promisify(exec)("npx sequelize-cli db:seed:all");
});
describe("GET: /", () => {
  test("200: Returns all users", async () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        console.log(body);
      });
  });

  afterAll(async () => {
    await sequelizeConnection.close();
  });
});
