import passport from "passport";
import {User} from "../models/User.js";

class UsersController {
    static authenticate = passport.authenticate("local", {
        successRedirect: "/users/success",
        failureRedirect: "/users/login",
        failureFlash: "IDかパスワードがちがいます。",
    }, null);

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    static login(req, res) {
        if (!req.session.refUrl) {
            req.session.refUrl = req.get("referer");
        }
        res.render("users/login");
    }

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     * @param {import("express").NextFunction} next
     */
    static success(req, res, next) {
        if (req.session.refUrl != null) {
            res.locals.redirect = req.session.refUrl;
            delete req.session.refUrl;
        } else {
            res.locals.redirect = "/";
        }
        next();
    }

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     * @param {import("express").NextFunction} next
     */
    static logout(req, res, next) {
        req.logout();
        res.locals.redirect = req.get("referer");
        next();
    }

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    static new(req, res) {
        res.render("users/new");
    }

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     * @param {import("express").NextFunction} next
     */
    static async create(req, res, next) {
        if (req.skip) return next();

        try {
            const tempUser = new User({
                username: req.body.username,
                view_name: req.body.view_name,
            });

            const user = await User.register(tempUser, req.body.password);
            if (user != null) {
                if (req.session.refUrl != null) {
                    res.locals.redirect = req.session.refUrl;
                    delete req.session.refUrl;
                } else {
                    res.locals.redirect = "/";
                }
                next();
            } else {
                res.locals.redirect = "/users/new";
                res.locals.error = e;
                next();
            }
        } catch (e) {
            console.error("Failed to create user", e);
            next(e);
        }
    }
}

export {UsersController};
