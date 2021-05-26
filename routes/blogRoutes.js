const router = require("express").Router();
const {
  addBlog,
  getAllBlogs,
  toggleLike,
} = require("../middlewares/blogMiddlewares");
router.get("/", (req, res) => {
  res.json("hello blog");
});

router.post("/add-blog", addBlog);
router.get("/data", getAllBlogs);
router.post("/toggle-like", toggleLike);

module.exports = router;
