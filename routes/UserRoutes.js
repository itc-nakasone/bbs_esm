import {Router} from "express";
import {BbsMiddleware} from "../controllers/BbsMiddleware.js";
import {UsersController} from "../controllers/UsersController.js";

const router = Router();

router.route("/login")
    .get(UsersController.login)
    .post(UsersController.authenticate);
router.get("/success", UsersController.success, BbsMiddleware.redirect);
router.get("/logout", UsersController.logout, BbsMiddleware.redirect);
router.route("/new")
    .get(UsersController.newIndex)
    .post(UsersController.create, BbsMiddleware.redirect);

export const userRoutes = router;