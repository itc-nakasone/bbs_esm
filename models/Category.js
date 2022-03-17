import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;

const schema = new Schema({
    serial: {
        type: Number,
        default: 0,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
});

export const Category = model("Category", schema);