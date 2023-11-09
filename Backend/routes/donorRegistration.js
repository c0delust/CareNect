import e, { Router } from "express";
import logger from "node-color-log";
import mongoose from "mongoose";
import Donor from "../models/donor_model.js";
import multer from "multer";
import dotenv from "dotenv";
import axios from "axios";
import CloudinaryUpload from "../services/cloudinaryUpload.js";

dotenv.config();

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/", upload.any(), async (req, res) => {
  if (!req.isAuthenticated() || !req.user) {
    return res.status(403).json({
      error: true,
      message: "User is not Authenticated. Registration Failed",
    });
  }

  const id = "DONOR_" + new mongoose.Types.ObjectId();

  try {
    const userPhotoUrl = await CloudinaryUpload(
      id,
      req.files[0],
      "DonorsData/UserPhotos/"
    );
    const aadhaarCardPhotoUrl = await CloudinaryUpload(
      id,
      req.files[1],
      "DonorsData/AadhaarCardPhotos/"
    );

    if (userPhotoUrl == null || aadhaarCardPhotoUrl == null) {
      return res.status(403).json({
        error: true,
        message: "Upload Failed",
      });
    }

    const donor = new Donor({
      _id: id,
      googleId: req.user.id,
      email:
        req.user.emails && req.user.photos.length > 0
          ? req.user.emails[0].value
          : undefined,
      fullName: req.body.fullName,
      userPhoto: userPhotoUrl,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      aadhaarCardNumber: req.body.aadhaarCardNumber,
      aadhaarCardPhoto: aadhaarCardPhotoUrl,
    });

    await donor.save();

    return res.status(201).json({
      error: false,
      message: "User Registered Successfully",
    });
  } catch (error) {
    return res.status(403).json({
      error: true,
      message: "User Registration Failed: File Upload Unsuccessful.",
    });
  }
});

export default router;
