import express from "express";
import { getBookmarks, toggleBookmark } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/bookmark", protect, toggleBookmark);
router.get("/bookmarks", protect, getBookmarks);

export default router;