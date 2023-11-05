import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import Donor from "./models/donor_model.js";

const passportConfig = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        scope: [
          "profile",
          "email",
          "https://www.googleapis.com/auth/userinfo.profile",
        ],
      },
      async (accessToken, refreshToken, profile, callback) => {
        // const existingUser = await Donor.findOne({ googleId: profile.id });

        // if (existingUser) {
        //   callback(null, existingUser);
        // }

        callback(null, profile);
      }
    )
  );

  passport.serializeUser((user, callback) => {
    callback(null, user);
  });

  passport.deserializeUser((user, callback) => {
    // Donor.findById(id).then((user) => {
    //   callback(null, user);
    // });
    callback(null, user);
  });
};

export default passportConfig;
