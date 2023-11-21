import mongoose from "mongoose";

const needSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.Mixed, required: true },
  title: String,
  category: String,
  doneeID: String,
  description: String,
  quantity: String,
  ngoID: String,
  donors: [String],
  deadline: Date,
  status: String,
  needImage: String,
});

const NEED = mongoose.model("NeedsCollection", needSchema, "NeedsCollection");

export default NEED;
