import Feed from "../models/Feed.js";
import Ad from "../models/Ad.js";


// ================= FEED CRUD =================

// CREATE
export const createFeed = async (req, res) => {
    try {
        const feed = await Feed.create(req.body);

        res.json({
            message: "Feed created successfully",
            data: feed,
        });
    } catch (err) {
        res.status(500).json({ message: "Error creating feed" });
    }
};

// READ
export const getFeeds = async (req, res) => {
    try {
        const feeds = await Feed.find();

        res.json({
            message: "Feeds fetched",
            data: feeds,
        });
    } catch (err) {
        res.status(500).json({ message: "Error fetching feeds" });
    }
};

// UPDATE 
export const updateFeed = async (req, res) => {
    try {
        const updatedFeed = await Feed.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedFeed) {
            return res.status(404).json({ message: "Feed not found" });
        }

        res.json({
            message: "Feed updated successfully",
            data: updatedFeed,
        });
    } catch (err) {
        res.status(500).json({ message: "Error updating feed" });
    }
};

// DELETE
export const deleteFeed = async (req, res) => {
    try {
        const deleted = await Feed.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Feed not found" });
        }

        res.json({
            message: "Feed deleted",
        });
    } catch (err) {
        res.status(500).json({ message: "Error deleting feed" });
    }
};



// ================= ADS CRUD =================

// CREATE
export const createAd = async (req, res) => {
    try {
        const ad = await Ad.create(req.body);

        res.json({
            message: "Ad created successfully",
            data: ad,
        });
    } catch (err) {
        res.status(500).json({ message: "Error creating ad" });
    }
};

// READ
export const getAds = async (req, res) => {
    try {
        const ads = await Ad.find();

        res.json({
            message: "Ads fetched",
            data: ads,
        });
    } catch (err) {
        res.status(500).json({ message: "Error fetching ads" });
    }
};

// UPDATE 
export const updateAd = async (req, res) => {
    try {
        const updatedAd = await Ad.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedAd) {
            return res.status(404).json({ message: "Ad not found" });
        }

        res.json({
            message: "Ad updated successfully",
            data: updatedAd,
        });
    } catch (err) {
        res.status(500).json({ message: "Error updating ad" });
    }
};

// DELETE
export const deleteAd = async (req, res) => {
    try {
        const deleted = await Ad.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Ad not found" });
        }

        res.json({
            message: "Ad deleted",
        });
    } catch (err) {
        res.status(500).json({ message: "Error deleting ad" });
    }
};