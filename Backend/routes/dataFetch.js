import { Router } from "express";
import NGO from "../models/ngo_model.js";

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

export default router;
