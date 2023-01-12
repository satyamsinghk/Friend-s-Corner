const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");

const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const cookieParser = require("cookie-parser");
// const router = require("./routes/router");
const userRouter = require("./routes/userRouter");

const errorController = require("./controllers/errorController");

const dbConnection = require("./dbConnection");
const { db } = require("./models/userModel");
// const adminRouter = require("./routes/adminRouter");

// enabled for all incoming request
// app.use(dbConnection());
app.use(
  cors({
    origin: "http://localhost:5500",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

//use router for only path /"route"
// app.use("/route", router);
app.use("/user", userRouter);
// app.use("/admin", adminRouter);

app.use(express.static("./build/"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

app.use(errorController);

// Middlewares

// app.post("/", (req, res) => {
//   console.log(req.path, req.method);
//   console.log(req.body);
//   res.send({ success: true, message: "server data" });
// });

app.listen(port, () => {
  //   console.clear();
  console.log(`Server started on port ${port}!`);
});
