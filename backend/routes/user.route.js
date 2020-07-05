const express = require('express');
const router = express.Router();


const { User } = require("../models/user.model");
const { registerController } = require('../controllers/user.controller');

// Define Route
router.post("/register", registerController);

module.exports = router;