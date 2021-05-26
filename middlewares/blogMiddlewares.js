const Blog = require("../models/Blog");
const User = require("../models/User");

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    return res.status(200).json({
      msg: "Successfully fetch all the blogs",
      blogs,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message, success: false });
  }
};

exports.addBlog = async (req, res) => {
  try {
    const { title, content, authorId, authorName } = req.body;

    if (!title || !content || !authorId || !authorName) {
      return res.json({
        msg: "All the fields are required. Cannnot add a new blog!",
        success: false,
      });
    }
    const NewBlog = new Blog({
      title,
      content,
      authorId,
      authorName,
      comments: [],
      likes: [],
      dislikes: [],
    });

    const savedBlog = await NewBlog.save();
    const user = await User.findOneAndUpdate(
      { _id: authorId },
      {
        $push: {
          blogs: {
            blogId: savedBlog._id,
          },
        },
      }
    );
    return res.status(200).json({
      msg: "Blog saved successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

exports.toggleLike = async (req, res) => {
  try {
    const { blogId, userId, likeType } = req.body;
    console.log(blogId);
    console.log(userId);
    console.log(likeType);
    const { likes, dislikes } = await Blog.findOne({ _id: blogId });

    if (likeType === "like") {
      const actualLikes = [...likes];
      const actualDislikes = [...dislikes];
      console.log("actualLikes", actualLikes);
      const indexIfUserLiked = actualLikes.findIndex(
        (el) => el.userId === userId
      );
      console.log(indexIfUserLiked);
      if (indexIfUserLiked === -1) {
        actualLikes.push({ userId: userId });
      }
      const indexIfUserDisliked = actualDislikes.findIndex(
        (el) => el.userId === userId
      );
      let temp = [];
      if (indexIfUserDisliked !== -1) {
        temp = actualDislikes.filter((el) => el.userId !== userId);
      }
    }

    return res.status(200).json({ msg: "some data" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
