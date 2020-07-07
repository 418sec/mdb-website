const express = require("express");

const { Like } = require("../models/like.model");
const { Dislike } = require("../models/dislike.model");
const { isAuth } = require("../middleware/auth");

const getLikesController = async (req, res) => {
  try {
    let variable = {};
    if (req.body.videoId) {
      variable = { videoId: req.body.videoId };
    } else {
      variable = { commentId: req.body.commentId };
    }
    const likes = await Like.find(variable);
    if (likes) {
      res.status(200).json({ success: true, likes });
    }
  } catch (error) {
    return res.status(400).send({ success: false, error });
  }
};

const getDislikesController = async (req, res) => {
  try {
    let variable = {};
    if (req.body.videoId) {
      variable = { videoId: req.body.videoId };
    } else {
      variable = { commentId: req.body.commentId };
    }
    const dislikes = await Dislike.find(variable);
    if (dislikes) {
      res.status(200).json({ success: true, dislikes });
    }
  } catch (error) {
    return res.status(400).send({ success: false, error });
  }
};

const upLikeController = async (req, res) => {
  try {
    let variable = {};
    if (req.body.videoId) {
      variable = { videoId: req.body.videoId, userId: req.body.userId };
    } else {
      variable = { commentId: req.body.commentId, userId: req.body.userId };
    }
    const like = new Like(variable);
    const success = await like.save();
    if (success) {
      const dislike = await Dislike.findOneAndDelete(variable);
      if (dislike) {
        res.status(200).json({ success: true });
      }
    }
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

const unLikeController = async (req, res) => {
  try {
    let variable = {};
    if (req.body.videoId) {
      variable = { videoId: req.body.videoId, userId: req.body.userId };
    } else {
      variable = { commentId: req.body.commentId, userId: req.body.userId };
    }
    const result = await Like.findOneAndDelete(variable);
    if (result) {
      res.status(200).json({ success: true });
    }
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

const unDislikeController = async (req, res) => {
  try {
    let variable = {};
    if (req.body.videoId) {
      variable = { videoId: req.body.videoId, userId: req.body.userId };
    } else {
      variable = { commentId: req.body.commentId, userId: req.body.userId };
    }
    const result = await Dislike.findOneAndDelete(variable);
    if (result) {
      res.status(200).json({ success: true });
    }
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

const upDislikeController = async (req, res) => {
  try {
    let variable = {};
    if (req.body.videoId) {
      variable = { videoId: req.body.videoId, userId: req.body.userId };
    } else {
      variable = { commentId: req.body.commentId, userId: req.body.userId };
    }
    const dislike = new Dislike(variable);
    const success = await dislike.save();
    if (success) {
      const like = await Like.findOneAndDelete(variable);
      if (like) {
        res.status(200).json({ success: true });
      }
    }
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

module.exports = {
  getLikesController,
  getDislikesController,
  upLikeController,
  unLikeController,
  unDislikeController,
  upDislikeController,
};
