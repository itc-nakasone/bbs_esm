import {Category} from "../models/Category.js";
import {Thread} from "../models/Thread.js";

class BbsMiddleware {
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     * @param {import("express").NextFunction} next
     */
    static redirect(req, res, next) {
        if (res.locals.redirect != null) {
            res.redirect(res.locals.redirect);
        } else {
            next();
        }
    }

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     * @param {import("express").NextFunction} next
     */
    static async loadCategories(req, res, next) {
        try {
            res.locals.categoryList = await Category.find().sort({serial: 1}).exec();
            next();
        } catch (e) {
            console.warn("error occurred in Model-Category", e);
            res.locals.categoryList = [];
            next();
        }
    }

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     * @param {import("express").NextFunction} next
     */
    static async loadCategory(req, res, next) {
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

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     * @param {import("express").NextFunction} next
     */
    static async loadThreads(req, res, next) {
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
}

export {BbsMiddleware}