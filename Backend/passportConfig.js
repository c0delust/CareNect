import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const passportConfig = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        callbackURL: "/donor/google/callback",
        scope: [
          "profile",
          "email",
          "https://www.googleapis.com/auth/userinfo.profile",
        ],
      },
      async (accessToken, refreshToken, profile, callback) => {
        const user = {
          id: profile.id,
          name: profile.displayName,
        };

        callback(null, user);
      }
    )
  );

  passport.serializeUser((user, callback) => {
    callback(null, user);
  });

  passport.deserializeUser((user, callback) => {
    callback(null, user);
  });
};

export default passportConfig;
