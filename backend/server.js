import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import feedRoutes from "./routes/feedRoutes.js";
import adRoutes from "./routes/adRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import startRSSFetcher from "./utils/rssFetcher.js";

dotenv.config();
connectDB();
startRSSFetcher();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/feed", feedRoutes);
app.use("/api/ads", adRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});