const { User } = require("../models/user.model");

const auth = async (req, res, next) => {
  const token = req.cookies.w_auth;
  const user = await User.findByToken(token);
  if (user) {
    req.token = token;
    req.user = user;
    next();
  }
  if (!user) {
    return res.json({
      isAuth: false,
      message: "Not authorized",
    });
  } else {
    return res.status(500).json({
      isAuth: false,
      message: "Something went wrong.",
    });
  }
};

module.exports = { auth };
