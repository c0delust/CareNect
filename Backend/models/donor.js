import mongoose from "mongoose";

const donorSchema = new mongoose.Schema({
  googleId: String,
  email: String,
  fullName: String,
  userPhoto: String,
  phoneNumber: String,
  address: String,
  latitude: String,
  longitude: String,
  aadhaarCardNumber: String,
  aadhaarCardPhoto: String,
});

const Donor = mongoose.model(
  "DonorsCollection",
  donorSchema,
  "DonorsCollection"
);
export default Donor;
