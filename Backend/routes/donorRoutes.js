import { Router } from "express";
import NGO from "../models/ngo_model.js";
import NEED from "../models/need_model.js";
import logger from "node-color-log";
import passport from "passport";
import Donor from "../models/donor_model.js";
import donorRegisterRoute from "./donorRegister.js";

const router = Router();

// Authentication Routes

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    // successRedirect: "http://localhost:5173/",
    failureRedirect: "/loginFailed",
  }),
  async function (req, res) {
    if (req.isAuthenticated()) {
      const existingUser = await Donor.findOne({ googleId: req.user.id });
      if (!existingUser) {
        res.cookie("isNew", true);
      }
    }

    res.redirect(process.env.FRONTEND_URL);
  }
);

const isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated() || !req.session.passport || !req.user) {
    logger.error("User not authenticated");
    return res
      .status(401)
      .json({ error: true, message: "User not authenticated" });
  }
  return next();
};

router.get("/authStatus", isAuthenticated, async (req, res) => {
  res.status(200).json({
    error: false,
    message: "Successfully Logged In",
    id: req.user.id,
  });
});

router.get("/loginFailed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy(function () {
    logger.info("Donor Logging out");
    res.redirect(process.env.FRONTEND_URL);
  });
});

// Registration Route

router.use("/register", isAuthenticated, donorRegisterRoute);

// Data Routes

router.get("/getDonor", isAuthenticated, async (req, res) => {
  try {
    const donor = await Donor.findOne({ googleId: req.user.id }).select(
      "googleId fullName email userPhoto"
    );

    res.status(200).json(donor);
  } catch (error) {
    res.status(404).json({ error: true, message: error.message });
  }
});

router.get("/getNGOs", isAuthenticated, async (req, res) => {
  try {
    const ngoList = await NGO.find();
    res.status(200).json(ngoList);
  } catch (error) {
    res.status(404).json({ error: true, message: error.message });
  }
});

router.get("/getNeeds", isAuthenticated, async (req, res) => {
  try {
    const pageSize = 8;
    const pageNumber = req.query.page;

    const skip = (pageNumber - 1) * pageSize;
    const totalCount = await NEED.countDocuments();
    const limit = Math.min(pageSize, totalCount - skip);

    const needsList = await NEED.find().skip(skip).limit(limit);

    const hasMoreItems = totalCount > skip + limit;

    res.status(200).json({ needsList, hasMoreItems });
  } catch (error) {
    res.status(404).json({ error: true, message: error.message });
  }
});

export default router;
