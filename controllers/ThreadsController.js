import {Thread} from "../models/Thread.js";
import {Message} from "../models/Message.js";

const index = (req, res) => {
    delete req.session.refUrl;
    res.render("threads/index");
}

const newIndex = (req, res) => {
    res.render("threads/new");
}

const create = async (req, res, next) => {
    if (req.skip) return next();

    try {
        const thread = await Thread.create({
            title: req.body.title,
            category: res.locals.category,
            owner: res.locals.currentUser,
        });
        res.locals.redirect = `/threads/read/${thread._id}/latest`;
        res.locals.thread = thread;
        await Message.create({
            content: req.body.message,
            thread: thread,
            user: res.locals.currentUser
        });
        next();
    } catch (e) {
        console.error("Error saving thread or first message...", e);
        await res.locals.thread.remove().exec();
        next(e);
    }
}

const remove = async (req, res, next) => {
    try {
        await Message.deleteMany({
            thread: res.locals.thread,
        }).exec();
        await Thread.findByIdAndDelete(res.locals.thread).exec();
        res.locals.redirect = "/";
        next();
    } catch (e) {
        console.log("Error deleting thread or messages...", e);
        next(e);
    }
}

export const ThreadsController = {
    index, newIndex, create, remove
};