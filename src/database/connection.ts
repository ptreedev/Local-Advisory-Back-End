import { Sequelize } from "sequelize";
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_USERNAME,
  TEST_DATABASE,
  TEST_PASSWORD,
  TEST_USERNAME,
} from "../configs";

export let sequelizeConnection: Sequelize = new Sequelize(
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
  {
    dialect: "sqlite",
    storage: "sequelize.sqlite",
  }
);

export let testConnection: Sequelize = new Sequelize(
  TEST_DATABASE,
  TEST_USERNAME,
  TEST_PASSWORD,
  {
    dialect: "sqlite",
    storage: "test.sqlite",
  }
);
