import { Router } from "express";

import {
  create,
  getAll,
  getMessages,
  remove,
} from "../controllers/chat.controller";

import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authenticate, create);

router.get("/", authenticate, getAll);

router.get("/:id", authenticate, getMessages);

router.delete("/:id", authenticate, remove);

export default router;
