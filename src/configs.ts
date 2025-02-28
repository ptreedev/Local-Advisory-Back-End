import dotenv from "dotenv";
dotenv.config({
  path: `${__dirname}/../.env`,
});

export const {
  PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_DATABASE,
  TEST_DATABASE,
  TEST_USERNAME,
  TEST_PASSWORD,
} = { ...process.env } as { [key: string]: string };
