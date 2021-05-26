const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        login: false,
        token: null,
        user: null,
        msg: "Wprowadź dane!",
      });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({
        login: false,
        token: null,
        user: null,
        msg: "Nie istnieje konto o podanym emailu!",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        login: false,
        token: null,
        user: null,
        msg: "Niepoprawny email lub hasło",
      });
    }
    const token = jwt.sign({ id: user._id }, "SECRET");
    return res.json({
      login: true,
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        blogs: user.blogs,
      },
      msg: "Poprawnie zalogowano",
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
