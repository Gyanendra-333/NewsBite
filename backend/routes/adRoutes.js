import express from "express";
import { trackAdView, trackAdClick, getAdStats } from "../controllers/adController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/view", protect, trackAdView);
router.post("/click", protect, trackAdClick);

// admin stats
router.get("/stats", protect, getAdStats);

export default router;