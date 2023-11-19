import { Router } from "express";
import jwt from "jsonwebtoken";
import NGO from "../models/ngo_model.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import DONEE from "../models/donee_model.js";
import doneeRegisterRoute from "./doneeRegister.js";
import NEED from "../models/need_model.js";

dotenv.config();
const router = Router();

router.use(cookieParser());

const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err || decoded.userType !== "ngoAdmin") {
      return res
        .status(402)
        .json({ message: "Invalid token or unauthorized access" });
    }

    req.id = decoded.id;

    return next();
  });
};

router.post("/login", async (req, res) => {
  const { registrationNo, password } = req.body;

  const ngo = await NGO.findOne({ registrationNo }).lean();

  if (!ngo || !bcrypt.compareSync(password, ngo.password)) {
    return res
      .status(401)
      .json({ error: true, message: "Invalid Credentials" });
  }

  const token = jwt.sign(
    { registrationNo, userType: "ngoAdmin", id: ngo._id },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );

  return res.status(200).json({
    error: false,
    message: "Successfully Logged In",
    token: token,
    id: ngo._id,
  });
});

router.use("/registerDonee", isAuthenticated, doneeRegisterRoute);

router.get("/getNGO", isAuthenticated, async (req, res) => {
  const ngo = await NGO.findOne(
    { _id: req.id },
    "registrationNo name logoUrl type description parentOrganization website address"
  ).lean();

  return res.json(ngo);
});

router.get("/getDonees", isAuthenticated, async (req, res) => {
  const data = await DONEE.find({ onBoardedBy: req.id }).lean();
  return res.json(data);
});

router.get("/getCount", isAuthenticated, async (req, res) => {
  let count;
  switch (req.query.heading) {
    case "Total Donees":
      count = await DONEE.countDocuments({ onBoardedBy: req.id });
      return res.json({ count });
    case "Verified Donees":
      count = await DONEE.countDocuments({
        onBoardedBy: req.id,
        "verificationStatus.phone": true,
        "verificationStatus.aadhaarCard": true,
      });
      return res.json({ count });
    case "Total Needs":
      count = await NEED.countDocuments({ ngoID: req.id });
      return res.json({ count });
    case "Active Needs":
      count = await NEED.countDocuments({ ngoID: req.id, status: "active" });
      return res.json({ count });
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.FRONTEND_URL);
});

export default router;
