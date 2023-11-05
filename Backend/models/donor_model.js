import mongoose from "mongoose";

const donorSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.Mixed, required: true },
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
