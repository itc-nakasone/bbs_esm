import mongoose from "mongoose";
import dayjs from "dayjs";
import "dayjs/locale/ja.js";
import {Thread} from "./Thread.js";

const Schema = mongoose.Schema;
const model = mongoose.model;

const schema = new Schema({
    serial: {
        type: Number,
        default: 0,
    },
    content: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    thread: {
        type: Schema.Types.ObjectId,
        ref: "Thread",
    },
    deleted: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});

schema.virtual("postedAt").get(function () {
    return dayjs(this.createdAt).locale("ja").format("YYYY/MM/DD(ddd) HH:mm:ss.SSS");
})

schema.pre("save", async function (next) {
    try {
        const Message = model("Message");
        const count = await Message.count({
            thread: this.thread,
        }).exec();
        this.serial = count + 1;
        next();
    } catch (e) {
        console.error("Failed to get count of messages in the same thread.");
        next(e);
    }
});

schema.post("save", async function () {
    await Thread.findByIdAndUpdate(this.thread, {
        $set: {
            updatedAt: this.createdAt
        }
    }).exec();
});

export const Message = model("Message", schema);