import e, { Router } from "express";
import logger from "node-color-log";
import mongoose from "mongoose";
import Donor from "../models/donor.js";
import multer from "multer";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/", upload.any(), async (req, res) => {
  //   console.log(req.body);
  //   console.log(req.files);

  //   console.log(req);

  if (req.isAuthenticated()) {
    console.log(req.body);
    if (req.user) {
      const donor = new Donor({
        googleId: req.user.id,
        email:
          req.user.emails && req.user.photos.length > 0
            ? req.user.emails[0].value
            : undefined,
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        aadhaarCardNumber: req.body.aadhaarCardNumber,
      });

      await donor.save();

      return res.status(201).json({
        error: false,
        message: "User Registered Successfully",
      });
    }
  } else {
    return res.status(201).json({
      error: true,
      message: "User is not Authenticated. Registration Failed",
    });
  }

  //   try {
  //     const profile = await axios.get(
  //       "http://localhost:3000/auth/login/success",
  //       {
  //         mode: "cors",
  //         withCredentials: true,
  //       }
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }

  //   console.log(profile.status);

  res.sendStatus(200);
});

export default router;
