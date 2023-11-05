import mongoose from "mongoose";
import logger from "node-color-log";
import dotenv from "dotenv";

dotenv.config();

const monngodb_url = process.env.MONGODB_CONNECTION_URL;
const connectMongoDB = async () => {
  await mongoose
    .connect(monngodb_url)
    .then(() => {
      logger.success("MongoDB is connected!");
    })
    .catch((error) => {
      logger.error("MongoDB connection unsuccessful! Error: " + error);
    });
};

export default connectMongoDB;
