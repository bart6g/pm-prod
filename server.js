const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const { calculate } = require("./middlewares/calculate");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;
mongoose.connect(
  process.env.MONGODB_URI,
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
  return res.json(result);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
