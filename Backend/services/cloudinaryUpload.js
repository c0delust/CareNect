import dotenv from "dotenv";
import logger from "node-color-log";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const CloudinaryUpload = async (id, file, folderName) => {
  const extension = () => {
    const parts = file.originalname.split(".");
    if (parts.length > 1) {
      return "." + parts.pop();
    } else {
      return "";
    }
  };

  const fileName = id + extension();

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    const result = new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            public_id: fileName,
            folder: folderName,
            resource_type: "raw",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result.secure_url);
            }
          }
        )
        .end(file.buffer);
    });

    return await result;
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
};

export default CloudinaryUpload;
