import {Router} from "express";
import {BbsMiddleware} from "../controllers/BbsMiddleware.js";
import {MessagesController} from "../controllers/MessagesController.js";

const router = Router();

router.route("/new/:tid")
    .all(BbsMiddleware.requireLogin, BbsMiddleware.loadThread)
    .get(MessagesController.newIndex)
    .post(MessagesController.create, BbsMiddleware.redirect);
router.route("/delete/:tid/:mid")
    .all(BbsMiddleware.requireLogin, BbsMiddleware.loadThread)
    .get(MessagesController.remove, BbsMiddleware.redirect);

export const messageRoutes = router;
