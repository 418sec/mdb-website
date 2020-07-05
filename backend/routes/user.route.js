const express = require('express');
const router = express.Router();


const { User } = require("../models/user.model");
const { registerController, loginController } = require('../controllers/user.controller');

// Define Route
router.post("/register", registerController);
router.post("/login", loginController);

module.exports = router;