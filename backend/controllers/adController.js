import AdInteraction from "../models/AdInteraction.js";
import Ad from "../models/Ad.js";

//  AD VIEW TRACK
export const trackAdView = async (req, res) => {
    try {
        const { adId } = req.body;

        let interaction = await AdInteraction.findOne({
            user: req.user._id,
            ad: adId,
        });

        if (!interaction) {
            interaction = await AdInteraction.create({
                user: req.user._id,
                ad: adId,
                viewed: true,
            });

            return res.json({
                message: "Ad view tracked",
            });
        }

        // already viewed
        if (!interaction.viewed) {
            interaction.viewed = true;
            await interaction.save();
        }

        res.json({
            message: "Ad already viewed",
        });
    } catch (error) {
        res.status(500).json({
            message: "Error tracking ad view",
        });
    }
};

// Track Ad Click
export const trackAdClick = async (req, res) => {
    try {
        const { adId } = req.body;

        let interaction = await AdInteraction.findOne({
            user: req.user._id,
            ad: adId,
        });

        if (!interaction) {
            interaction = await AdInteraction.create({
                user: req.user._id,
                ad: adId,
                clicked: true,
            });

            return res.json({
                message: "Ad click tracked",
            });
        }

        if (!interaction.clicked) {
            interaction.clicked = true;
            await interaction.save();
        }

        res.json({
            message: "Ad click recorded",
        });
    } catch (error) {
        res.status(500).json({
            message: "Error tracking ad click",
        });
    }
};

// Get Ad Stats
export const getAdStats = async (req, res) => {
    try {
        const ads = await Ad.find();

        let result = [];

        for (let ad of ads) {
            const views = await AdInteraction.countDocuments({
                ad: ad._id,
                viewed: true,
            });

            const clicks = await AdInteraction.countDocuments({
                ad: ad._id,
                clicked: true,
            });

            const ctr = views > 0 ? ((clicks / views) * 100).toFixed(2) : 0;

            result.push({
                adId: ad._id,
                title: ad.title,
                totalViews: views,
                totalClicks: clicks,
                ctr: `${ctr}%`,
            });
        }

        res.json({
            message: "Ad stats fetched successfully",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching ad stats",
        });
    }
};