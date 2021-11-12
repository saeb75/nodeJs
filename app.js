require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const route = require("./routes/routes");

const app = express();
const port = process.env.PORT;
//middelware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));
app.use("/api/posts", route);
//DATABASE CONNECT
mongoose
  .connect(process.env.DB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connect data base"));
app.listen(port, () => console.log("server starting"));
