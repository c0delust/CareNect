import mongoose from "mongoose";

const doneeSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.Mixed, required: true },
  onBoardedBy: String,
  fullName: String,
  phoneNumbers: [String],
  address: String,
  latitude: String,
  longitude: String,
  aadhaarCardNumber: String,
  aadhaarCardPhotoUrl: String,
  familyInfo: {
    memberCount: Number,
    income: Number,
    incomeSource: String,
  },
  verificationStatus: {
    phone: Boolean,
    aadhaarCard: Boolean,
  },
  registeredOn: Date,
});

const DONEES = mongoose.model(
  "DoneesCollection",
  doneeSchema,
  "DoneesCollection"
);
export default DONEES;
