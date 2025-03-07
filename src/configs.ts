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
  DB_CONNECTION,
  DB_STORAGE,
} = { ...process.env } as { [key: string]: string };
