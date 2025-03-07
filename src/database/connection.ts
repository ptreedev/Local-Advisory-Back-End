import { Sequelize } from "sequelize";
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_USERNAME,
  TEST_DATABASE,
  TEST_PASSWORD,
  TEST_USERNAME,
  DB_CONNECTION,
  DB_STORAGE,
  DB_LOGGING
} from "../configs";
const dialect = DB_CONNECTION as "sqlite" | "mysql";

export let sequelizeConnection: Sequelize = new Sequelize(
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
  {
    dialect: 'sqlite',
    storage: DB_STORAGE
  }
);
