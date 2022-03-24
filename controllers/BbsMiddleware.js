import {Category} from "../models/Category.js";
import {Thread} from "../models/Thread.js";
import {Message} from "../models/Message.js";

const redirect = (req, res, next) => {
    if (res.locals.redirect != null) {
        res.redirect(res.locals.redirect);
    } else {
        next();
    }
}

const loadCategories = async (req, res, next) => {
    try {
        res.locals.categoryList = await Category.find().sort({serial: 1}).exec();
        next();
    } catch (e) {
        console.warn("error occurred in Model-Category", e);
        res.locals.categoryList = [];
        next();
    }
}

const loadCategory = async (req, res, next) => {
    try {
        const cid = req.params.cid;
        const category = await Category.findById(cid).exec();
        if (category == null) {
            return next(new Error("Category ID is invalid!!!!"));
        }
        res.locals.category = category;
        next();
    } catch (e) {
        console.error("error occurred in Model-Category")
    }
}

const loadThreads = async (req, res, next) => {
    try {
        res.locals.threadList = await Thread.find({category: res.locals.category})
            .sort({updatedAt: -1}).exec();
        next();
    } catch (e) {
        console.warn("error occurred in Mode-Thread.", e);
        res.locals.threadList = [];
        next();
    }
}

const loadThread = async (req, res, next) => {
    try {
        const thread = await Thread.findById(req.params.tid).exec();
        if (thread == null) {
            console.error(`thread id: ${req.params.tid}`);
            return next(new Error("Thread ID is invalid!!"));
        }
        res.locals.thread = thread;
        next();
    } catch (e) {
        console.error("error occurred in Model-Thread", e);
        next(e);
    }
}

const loadMessages = async (req, res, next) => {
    if (res.locals.thread == null) {
        return next(new Error("Thread is null"));
    }

    try {
        const query = Message.find({thread: res.locals.thread})
            .sort({createdAt: -1})
            .populate("user");
        if (req.path.match(/\/latest$/)) {
            query.limit(50);
        }
        const messages = await query.exec();
        res.locals.messageList = messages.reverse();
        next();
    } catch (e) {
        console.warn("error occurred in Model-Message", e);
        res.locals.messageList = [];
        next();
    }
}

const requireLogin = (req, res, next) => {
    if (!res.locals.loggedIn) {
        if (req.session.refUrl == null) {
            req.session.refUrl = req.originalUrl;
        }
        return res.redirect("/users/login")
    }
    next();
}

export const BbsMiddleware = {
    redirect, loadCategories, loadCategory, loadThreads, loadThread, loadMessages, requireLogin
};