const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const multer = require("multer");
const bodyParser = require("body-parser");
const path = require('path');

const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const userModel = require("./models/userModel");

const app = express();
app.use(express.json());
app.use(morgan("common"));
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5500;

//database connection
mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => console.log(err));

app.use("/api/user", userRoute);
app.use("/api/posts", postRoute);
app.use("/images",express.static(path.join(__dirname,"/uploads")));

app.listen(PORT, () => {
  console.log("server connected");
});

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "uploads");
  },
  filename: (req, file, callBack) => {
    callBack(null, `PostImage${file.originalname}`);
  },
});

var upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.send();
});


app.post("/file/:id", upload.single("file"), async (req, res ,next) => {
  const file = req.file;

  if (file) {
    const user = await userModel.findByIdAndUpdate(req.params.id, {
      profileImage: file.filename,
    });
    if (user) {
      res.status(200).json(user);
    }
  } else {
    // const error = new Error("Please upload a file");
    // error.httpStatusCode = 400;
    // return next(error);
    res.status(400).json("Please select a file")
  }
  // res.send(file)
});
