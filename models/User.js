import mongoose from "mongoose";
import passport from "passport-local-mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;

const schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z][a-zA-Z0-9]*$/,
    },
    view_name: {
        type: String,
        required: true,
        unique: true,
    },
});

schema.plugin(passport);

export const User = model("User", schema);