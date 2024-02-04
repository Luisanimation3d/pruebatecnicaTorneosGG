import {Router} from "express";
import {login} from "../controllers/auth.controller";
import {loginMiddleware} from "../middlewares/auth.middlewares";

const router = Router();

router.post('/', loginMiddleware, login);

export default router;