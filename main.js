import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';
import mongoose from "mongoose";

const app = express();

app.set("port", process.env.PORT || 3000);
app.set("view engine", "pug");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser("rzlqkCnvkNQnjguMvHuCfut6"));
app.use(session({
    secret: "rzlqkCnvkNQnjguMvHuCfut6",
    cookie: {maxAge: 4000000},
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize({}));
app.use(passport.session({}));

app.use((req, res, next) => {
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
});

try {
    await mongoose.connect("mongodb://localhost:27017/bbs");
    console.info("Successfully connected to MongoDB using Mongoose");

    app.listen(app.get("port"), () => {
        console.info(`Server running at http://localhost:${app.get("port")}`);
    });
} catch (e) {
    console.error("Failed to start server.", e);
    process.exit(-1);
}