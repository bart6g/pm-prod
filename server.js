const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const { calculate } = require("./middlewares/calculate");
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 5000;

mongoose.connect(
  "mongodb://localhost:27017/blog-app",
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Mongodb connection established successfully");
    }
  }
);

app.use("/users", userRouter);
app.post("/simulate", (req, res) => {
  console.log("here");
  const { set, tcalc, dt } = req.body;

  let result = calculate(set, tcalc, dt);

  // console.log(result);
  return res.json(result);
});
app.get("/", (req, res) => {
  return res.json("hello");
});
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
