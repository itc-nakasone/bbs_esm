import {Message} from "../models/Message.js";

const newIndex = (req, res) => {
    res.render("messages/new");
}

const create = async (req, res, next) => {
    if (req.skip || res.locals.thread == null || res.locals.currentUser == null) return next();

    try {
        await Message.create({
            content: req.body.message,
            thread: res.locals.thread,
            user: res.locals.currentUser,
        });
        res.locals.redirect = `/threads/read/${res.locals.thread._id}/latest`;
        next();
    } catch (e) {
        console.error("New message failed to create.", e);
        next(e);
    }
}


const remove = async (req, res, next) => {
    try {
        await Message.findByIdAndUpdate(req.params.mid, {
            $set: {
                deleted: true,
            }
        }).exec();
        res.locals.redirect = `threads/read/${req.params.tid}`;
        next();
    } catch (e) {
        console.error("Message failed to deleted (update).", e);
        next(e);
    }
}

export const MessagesController = {
    newIndex, create, remove
};