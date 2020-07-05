const { User } =  require('../models/user.model');

const registerController = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (user) {
    return res.status(422).json({
      error: "Username is already taken.",
    });
  } else {
    const user = new User({
      username,
      password,
    });
    const success = user.save();
    if (success) {
      return res.status(200).json({ success: true, message: 'Account successfully created.' });
    } else {
      return res
        .status(500)
        .json({ success: false, message: "Something wrong with database." });
    }
  }
};

module.exports = {registerController};