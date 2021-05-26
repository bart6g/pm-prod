const router = require("express").Router();
const { login } = require("../middlewares/login");
const { register } = require("../middlewares/register");
const { getUserData } = require("../middlewares/getData");
router.get("/", (req, res) => {
  res.json("hello user");
});

router.post("/register", register);
router.post("/login", login);
router.get("/get-userdata", getUserData);

module.exports = router;
