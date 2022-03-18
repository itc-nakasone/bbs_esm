import {Router} from "express";
import {BbsMiddleware} from "../controllers/BbsMiddleware.js";
import {HomeController} from "../controllers/HomeController.js";

const router = Router();

router.get("/", BbsMiddleware.loadCategories, HomeController.index);
router.get("/category/:cid", BbsMiddleware.loadCategory, BbsMiddleware.loadThreads, HomeController.threads);

export const homeRoutes = router;
