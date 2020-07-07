const express = require("express");
const router = express.Router();

const { isAuth } = require("../middleware/auth");
const {
  getLikesController,
  getDislikesController,
  upLikeController,
  unLikeController,
  unDislikeController,
  upDislikeController
} = require("../controllers/like.controller");

// Define Route
router.post("/getLikes", getLikesController);
router.post("/getDislikes", getDislikesController);
router.post("/upLike", upLikeController);
router.post("/unLike", unLikeController);
router.post("/unDislike", unDislikeController);
router.post("/upDislike", upDislikeController);

module.exports = router;
