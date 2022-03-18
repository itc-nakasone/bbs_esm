import {Router} from "express";
import {homeRoutes} from "./HomeRoutes.js";

const router = Router();

router.use("/", homeRoutes);

export const routes = router;