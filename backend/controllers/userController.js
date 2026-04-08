import User from "../models/User.js";

// toggle bookmark
export const toggleBookmark = async (req, res) => {
    try {
        const { articleId } = req.body;

        const user = await User.findById(req.user._id);

        const exists = user.savedArticles.includes(articleId);

        if (exists) {
            user.savedArticles = user.savedArticles.filter(
                (id) => id.toString() !== articleId
            );

            await user.save();

            return res.json({
                message: "Article removed from bookmarks",
            });
        }

        user.savedArticles.push(articleId);
        await user.save();

        res.json({
            message: "Article saved successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating bookmark",
        });
    }
};


export const getBookmarks = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate("savedArticles");

        res.json({
            bookmarks: user.savedArticles,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching bookmarks",
        });
    }
};