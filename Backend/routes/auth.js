import { Router } from "express";
import passport from "passport";
import logger from "node-color-log";
import Donor from "../models/donor_model.js";

const router = Router();

router.get("/login/success", (req, res) => {
  if (!req.session.passport) {
    res.status(403).json({ error: true, message: "Not Authorized" });
  } else {
    if (req.user) {
      res.status(200).json({
        error: false,
        message: "Successfully Logged In",
        id: req.user.id,
      });
    } else {
      res.status(403).json({ error: true, message: "Not Authorized" });
    }
  }
});

router.get("/userExists", async (req, res) => {
  if (!req.session.passport) {
    res.status(403).json({ error: true, message: "Not Authorized" });
  } else {
    if (req.user) {
      const existingUser = await Donor.findOne({ googleId: req.user.id });
      if (!existingUser) {
        res.status(200).json({
          error: false,
          message: "New User",
        });
      } else {
        res.status(200).json({
          error: false,
          message: "User Exists",
          userData: existingUser,
        });
      }
    } else {
      res.status(403).json({ error: true, message: "Not Authorized" });
    }
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    // successRedirect: "http://localhost:5173/",
    failureRedirect: "/login/failed",
  }),
  async function (req, res) {
    if (req.isAuthenticated()) {
      const existingUser = await Donor.findOne({ googleId: req.user.id });
      if (!existingUser) {
        res.cookie("isNew", true);
      }
    }

    res.redirect("http://localhost:5173/");
  }
);

router.get("/logout", (req, res) => {
  logger.success("Logging out");
  req.logout((err) => {});
  res.redirect("http://localhost:5173");
});

export default router;
