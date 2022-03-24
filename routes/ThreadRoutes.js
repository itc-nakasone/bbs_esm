import {Router} from "express";
import {BbsMiddleware} from "../controllers/BbsMiddleware.js";
import {ThreadsController} from "../controllers/ThreadsController.js";

const router = Router();

router.route("/new/:cid")
    .all(BbsMiddleware.requireLogin, BbsMiddleware.loadCategory)
    .get(ThreadsController.newIndex)
    .post(ThreadsController.create, BbsMiddleware.redirect);
router.use("/read/:tid", BbsMiddleware.loadThread, BbsMiddleware.loadMessages);
router.get("/read/:tid/latest", ThreadsController.index);
router.get("/read/:tid/all", ThreadsController.index);
router.get("/read/:tid", ThreadsController.index);
router.use("/delete/:tid", BbsMiddleware.requireLogin, BbsMiddleware.loadThread);
router.get("/delete/:tid", ThreadsController.remove, BbsMiddleware.redirect);

export const threadRoutes = router;
