import {Router} from "express";
import {homeRoutes} from "./HomeRoutes.js";
import {messageRoutes} from "./MessageRoutes.js";
import {threadRoutes} from "./ThreadRoutes.js";
import {userRoutes} from "./UserRoutes.js";

const router = Router();

router.use("/messages", messageRoutes);
router.use("/threads", threadRoutes);
router.use("/users", userRoutes);
router.use("/", homeRoutes);

export const routes = router;