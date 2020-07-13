const express = require("express");
const router = express.Router();

const { isAuth } = require("../middleware/auth");
const {
  getLikesController,
  upLikeController,
  unLikeController,
} = require("../controllers/like.controller");

// Define Route
router.post("/getLikes",isAuth, getLikesController);
router.post("/upLike",isAuth,  upLikeController);
router.post("/unLike",isAuth,  unLikeController);

module.exports = router;
