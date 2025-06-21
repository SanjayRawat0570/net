// backend/routes/user.routes.js

import express from "express";
import {
  addToWatchHistory,
  getRecommendations,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/:userId/watch-history", addToWatchHistory);
router.get("/:userId/recommendations", getRecommendations);

export default router; // ✅ default export

