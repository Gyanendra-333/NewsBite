import mongoose from "mongoose";

const feedSchema = new mongoose.Schema(
    {
        name: String,
        url: String,
        category: String,
        interval: {
            type: Number,
            default: 10,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Feed", feedSchema);