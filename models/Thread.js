import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;

const schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true,
});

export const Thread = model("Thread", schema);