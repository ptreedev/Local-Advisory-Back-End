import passport, { PassportStatic } from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { User } from "../database/models/user";

export default async (passport: PassportStatic) => {
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        //       I had to add an "or" statement below not sure why though and does using a string like this affect security?
        secretOrKey: process.env.JWT_SECRET || "secret",
      },
      async (jwtPayload: any, done: any) => {
        try {
          const user = await User.findOne({ where: { id: jwtPayload.id } });
          if (!user) {
            return done(null, false);
          } else return done(null, user);
        } catch (err) {
          return done(err, false);
        }
      }
    )
  );
};
//attach user to request object
// middleware
