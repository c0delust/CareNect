import { Router } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import multer from "multer";
import CloudinaryUpload from "../services/cloudinaryUpload.js";
import NEED from "../models/need_model.js";

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

  const id = "NEED_" + new mongoose.Types.ObjectId();
  try {
    const needImageUrl = await CloudinaryUpload(
      id,
      req.files[0],
      "NeedsData/NeedPhotos/"
    );

    if (needImageUrl == null) {
      return res.status(403).json({
        error: true,
        message: "File Upload Failed",
      });
    }
    const need = new NEED({
      _id: id,
      title: formData.title,
      category: formData.category,
      description: formData.description,
      quantity: formData.quantity,
      ngoID: req.id,
      donors: [],
      deadline: formData.deadline,
      status: "Pending",
      needImage: needImageUrl,
    });

    await need.save();

    return res.status(201).json({
      error: false,
      message: "Need added Successfully",
    });
  } catch (error) {
    return res.status(403).json({
      error: true,
      message: "Failed to add Need",
    });
  }
});

export default router;
