import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import Donor from "./models/donor.js";
import connectMongoDB from "./connectDB.js";
import dotenv from "dotenv";
import session from "express-session";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import passportConfig from "./passportConfig.js";
import donorRegistrationRoutes from "./routes/donorRegistration.js";
import bodyParser from "body-parser";

dotenv.config();

connectMongoDB();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: "GET,POST,PUT,DELETE",
  })
);

app.use(
  session({
    secret: "your-secret-key",
    name: "sessionId",
    maxAge: 24 * 60 * 60 * 100,
    resave: false,
    saveUninitialized: true,
    sameSite: "none",
  })
);

app.use(passport.initialize());
app.use(passport.session());

passportConfig();

app.use("/auth", authRoutes);
app.use("/registerDonor", donorRegistrationRoutes);

// app.get("/cors", (req, res) => {
//   res.set("Access-Control-Allow-Origin", "*");
//   res.send({ msg: "This has CORS enabled 🎈" });
// });

app.listen(port, () => {
  console.log(`Server app listening at ${port}`);
});
