import passport from "passport";
import {User} from "../models/User.js";

const authenticate = passport.authenticate("local", {
    successRedirect: "/users/success",
    failureRedirect: "/users/login",
    failureFlash: "IDかパスワードがちがいます。",
}, null);

const login = (req, res) => {
    if (!req.session.refUrl) {
        req.session.refUrl = req.get("referer");
    }
    res.render("users/login");
}

const success = (req, res, next) => {
    if (req.session.refUrl != null) {
        res.locals.redirect = req.session.refUrl;
        delete req.session.refUrl;
    } else {
        res.locals.redirect = "/";
    }
    next();
}

const logout = (req, res, next) => {
    req.logout();
    res.locals.redirect = req.get("referer");
    next();
}

const newIndex = (req, res) => {
    res.render("users/new");
}

const create = async (req, res, next) => {
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
            res.locals.error = new Error("???");
            next();
        }
    } catch (e) {
        res.locals.redirect = "/users/new";
        res.locals.error = e;
        next();
    }
}

export const UsersController = {
    authenticate, login, success, logout, newIndex, create,
};
