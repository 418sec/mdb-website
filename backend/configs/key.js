const dotenv = require("dotenv");

dotenv.config({
  path: "./.env",
});

if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}
