const dotenv = require("dotenv");

dotenv.config({
  path: ".env",
});

module.exports = {
  mongoURI: process.env.MONGO_DEV_URI,
};
