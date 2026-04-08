import mongoose from "mongoose";

const adSchema = new mongoose.Schema(
    {
        title: String,
        imageUrl: String,
        targetUrl: String,
        category: String,
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Ad", adSchema);