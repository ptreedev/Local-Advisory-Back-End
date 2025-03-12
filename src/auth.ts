import passport from "passport";
import * as passportLocal from "passport-local";
const LocalStrategy = passportLocal.Strategy;
import bcrypt from "bcrypt";
import { User } from "./database/models/user";

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        // Find the user by username in the database
        const user = await User.findOne({ where: { email: email } });
        // If the user does not exist, return an error
        if (!user) {
          return done(null, false, { message: "Incorrect email or password" });
        }

        // Compare the provided password with the
        // hashed password in the database
        const passwordsMatch = await bcrypt.compare(password, user.password);

        // If the passwords match, return the user object
        if (passwordsMatch) {
          return done(null, user);
        } else {
          // If the passwords don't match, return an error
          return done(null, false, { message: "Incorrect email or password" });
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);
