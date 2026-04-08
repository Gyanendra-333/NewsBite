import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        link: {
            type: String,
            unique: true,
        },
        pubDate: Date,
        source: String,
        category: String,
    },
    { timestamps: true }
);

export default mongoose.model("Article", articleSchema);