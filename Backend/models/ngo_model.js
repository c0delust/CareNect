import mongoose from "mongoose";

const ngoSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.Mixed, required: true },
  registrationNo: String,
  name: String,
  photos: [String],
  logoUrl: String,
  type: String,
  description: String,
  parentOrganization: String,
  phoneNumber: String,
  email: String,
  website: String,
  address: String,
  latitude: String,
  longitude: String,
  members: [
    {
      position: String,
      name: String,
      phoneNumber: String,
    },
  ],
  verificationStatus: {
    registrationNo: Boolean,
    phoneNumber: Boolean,
    address: Boolean,
  },
});

const NGO = mongoose.model("NGOCollection", ngoSchema, "NGOCollection");

export default NGO;
