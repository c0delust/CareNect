import { Router } from "express";
import NGO from "../models/ngo_model.js";
import NEED from "../models/need_model.js";
import logger from "node-color-log";

const router = Router();

router.get("/getNGOs", async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const ngoList = await NGO.find();
      res.status(200).json(ngoList);
    } catch (error) {
      res.status(404).json({ error: true, message: error.message });
    }
  } else {
    res.status(401).json({ error: true, message: "User not authenticated" });
  }
});

router.get("/getNeeds", async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const needsList = await NEED.find();
      res.status(200).json(needsList);
    } catch (error) {
      res.status(404).json({ error: true, message: error.message });
    }
  } else {
    res.status(401).json({ error: true, message: "User not authenticated" });
  }
});

export default router;
