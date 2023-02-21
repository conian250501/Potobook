import passport from "passport";
import { User } from "../app/models/userModel";
import { passwordHelper } from "../helper/passwordHelper";
const LocalStrategy = require("passport-local").Strategy;

export const passportLocal = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        const user = await User.findOne({ email });
        if (!user) {
          req.flash("error_message", "User dont exist");
          return done(null, false, { message: "User dont exist" });
        }
        const isValidPassword = await passwordHelper.comparePassword(
          user._id,
          password
        );

        if (isValidPassword) {
          done(null, user);
        } else {
          req.flash("error_message", "Password incorrect");
          done(null, false, { message: "Password incorrect" });
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (error, user) => {
      done(error, user);
    });
  });
};
