import { Router } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import multer from "multer";
import CloudinaryUpload from "../services/cloudinaryUpload.js";
import DONEE from "../models/donee_model.js";

dotenv.config();

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/", upload.any(), async (req, res) => {
  const formData = req.body;

  console.log(req.id);
  console.log(formData);
  console.log(req.files);

  const id = "DONEE_" + new mongoose.Types.ObjectId();
  try {
    const userPhotoUrl = await CloudinaryUpload(
      id,
      req.files[0],
      "DoneesData/UserPhotos/"
    );
    const aadhaarCardPhotoUrl = await CloudinaryUpload(
      id,
      req.files[1],
      "DoneesData/AadhaarCardPhotos/"
    );
    if (userPhotoUrl == null || aadhaarCardPhotoUrl == null) {
      return res.status(403).json({
        error: true,
        message: "File Upload Failed",
      });
    }
    const donee = new DONEE({
      _id: id,
      onBoardedBy: req.id,
      fullName: formData.fullName,
      photoUrl: userPhotoUrl,
      phoneNumbers: [formData.phoneNumber1, formData.phoneNumber2],
      address: formData.address,
      latitude: formData.latitude,
      longitude: formData.longitude,
      aadhaarCardNumber: formData.aadhaarCardNumber,
      aadhaarCardPhotoUrl: aadhaarCardPhotoUrl,
      familyInfo: {
        memberCount: formData.memberCount,
        income: formData.income,
        incomeSource: formData.incomeSource,
      },
      verificationStatus: {
        phone: true,
        aadhaarCard: true,
      },
    });

    await donee.save();

    return res.status(201).json({
      error: false,
      message: "Donee Registered Successfully",
    });
  } catch (error) {
    return res.status(403).json({
      error: true,
      message: "Donee Registration Failed",
    });
  }
});

export default router;
