import mongoose from "mongoose";

const adInteractionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        ad: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ad",
        },
        viewed: {
            type: Boolean,
            default: false,
        },
        clicked: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.model("AdInteraction", adInteractionSchema);