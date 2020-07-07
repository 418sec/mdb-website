const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const configs = require("./configs/key");
const userRouter = require('./routes/user.route');
const commentRouter = require('./routes/comment.route');
const favouriteRouter = require('./routes/favourite.route');
const likeRouter = require('./routes/like.route');

// Config .env to ./config/config.env
dotenv.config({
  path: "./.env",
});

// Database Connection.=
mongoose
  .connect(configs.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((connection) => {
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  })
  .catch((err) => console.log(err));

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));

  // index.html for all page routes    html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

app.use('/api/users', userRouter);
app.use('/api/comment', commentRouter);
app.use('/api/favourite', favouriteRouter);
app.use('/api/like', likeRouter);


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
