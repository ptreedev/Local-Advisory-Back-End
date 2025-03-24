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
<<<<<<< HEAD
  DB_CONNECTION,
  DB_STORAGE,
=======
  TEST_DATABASE,
  DB_LOGGING,
  TEST_USERNAME,
  TEST_PASSWORD,
  DB_CONNECTION,
  DB_STORAGE,
  JWT_SECRET,
>>>>>>> e186973df6c836f80a515b1c122b629adacf96d2
} = { ...process.env } as { [key: string]: string };
