import express from "express";
import passport from "passport";
import connectMongoDB from "./connectDB.js";
import dotenv from "dotenv";
import session from "express-session";
import cors from "cors";
import passportConfig from "./passportConfig.js";
import bodyParser from "body-parser";
import donorRoutes from "./routes/donorRoutes.js";
import ngoRoutes from "./routes/ngoRoutes.js";
import logger from "node-color-log";

logger.setDate(() => new Date().toLocaleTimeString().toUpperCase() + " ->");

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
    exposedHeaders: ["Authorization"],
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

app.use("/donor", donorRoutes);
app.use("/ngo", ngoRoutes);

app.listen(port, () => {
  console.log(`Server app listening at ${port}`);
});
