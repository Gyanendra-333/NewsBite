import Article from "../models/Article.js";
import Ad from "../models/Ad.js";
import User from "../models/User.js";

export const getFeed = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;

        const category = req.query.category;


        let filter = {};

        // Category filter (CASE-INSENSITIVE FIX)
        if (category && category !== "foryou") {
            filter.category = {
                $regex: `^${category}$`,
                $options: "i",
            };
        }

        // For You logic (FIXED + SAFE)
        if (category === "foryou") {
            const user = await User.findById(req.user._id);

            if (user?.preferences?.length > 0) {
                filter.category = {
                    $in: user.preferences.map(
                        (c) => new RegExp(`^${c}$`, "i")
                    ),
                };
            } else {
                filter = {};
            }
        }

        // Articles fetch
        const articles = await Article.find(filter)
            .sort({ pubDate: -1 })
            .skip(skip)
            .limit(limit);

        //  Active Ads
        const ads = await Ad.find({ isActive: true });

        let finalFeed = [];
        let adIndex = 0;
        const AD_FREQUENCY = 3;

        articles.forEach((article, index) => {
            finalFeed.push({
                type: "article",
                data: article,
            });

            // Ad Injection
            if ((index + 1) % AD_FREQUENCY === 0 && ads.length > 0) {
                const ad = ads[adIndex % ads.length];

                finalFeed.push({
                    type: "ad",
                    data: ad,
                });

                adIndex++;
            }
        });

        res.json({
            message: "Feed fetched successfully",
            page,
            count: finalFeed.length,
            feed: finalFeed,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error fetching feed",
        });
    }
};