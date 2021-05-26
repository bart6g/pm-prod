const User = require("../models/User");

exports.getUserData = async (req, res) => {
  try {
    const { id } = req.query;

    const user = await User.findOne({ _id: id });

    return res.status(200).json({ user: user });
  } catch {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};
