const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGODB_CONNNECT, { useNewUrlParser: true });
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("open", () => {
  console.log("Connection has been made to the database.");
});

app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

const subscribersRouter = require("./Routes/Subscribers");
app.use("/subscribers", subscribersRouter);

app.listen(process.env.PORT, () => {
  console.log("The API has started");
});
