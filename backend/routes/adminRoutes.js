import express from "express";
import {
    createFeed,
    getFeeds,
    deleteFeed,
    updateFeed,
    createAd,
    getAds,
    deleteAd,
    updateAd,
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// ================= FEEDS =================
router.post("/feeds", protect, createFeed);
router.get("/feeds", protect, getFeeds);
router.put("/feeds/:id", protect, updateFeed);
router.delete("/feeds/:id", protect, deleteFeed);


// ================= ADS =================
router.post("/ads", protect, createAd);
router.get("/ads", protect, getAds);
router.put("/ads/:id", protect, updateAd);
router.delete("/ads/:id", protect, deleteAd);



export default router;