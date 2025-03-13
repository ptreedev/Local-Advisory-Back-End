import dotenv from "dotenv";
dotenv.config({
  path:
    process.env.NODE_ENV === "test"
      ? `${__dirname}/../.env.test`
      : `${__dirname}/../.env`,
});

export const {
  PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_DATABASE,
  TEST_DATABASE,
  DB_LOGGING,
  TEST_USERNAME,
  TEST_PASSWORD,
  DB_CONNECTION,
  DB_STORAGE,
  JWT_SECRET,
} = { ...process.env } as { [key: string]: string };
