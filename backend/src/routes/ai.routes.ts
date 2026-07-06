import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { generateRecipe } from "../controllers/ai.controller";

const router = Router();

router.post("/:id/message", authenticate, generateRecipe);

export default router;
