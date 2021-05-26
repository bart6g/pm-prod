const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      max: 64,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    authorName: {
      type: String,
      trim: true,
      required: true,
    },
    comments: [],
    likes: [],
    dislikes: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
