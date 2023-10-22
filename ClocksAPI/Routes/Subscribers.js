const express = require("express");
const router = express.Router();
const Subscriber = require("../Models/Subscriber");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = router;

// Verify One

router.get("/Verify", async (req, res) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    res.status(401);
    res.send("Not Authorized");
    return;
  }

  let token = req.headers.authorization.split("")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    res.status(401);
    res.send("Invalid token");
    return;
  }

  let subscriber = await Subscriber.findOne({
    name: decoded.userName,
  }).select("-hashedPassword");

  if (!subscriber) {
    res.status(401);
    res.send("Invalid user name");
    return;
  }

  res.status(200);
  res.send("Valid");
});

// Log in

router.post("/login", async (req, res) => {
  if (!req.body.password) {
    res.status(400);
    res.send("Request passed without password.");
    return;
  }

  let user;

  if (req.body.name) {
    user = await Subscriber.findOne({ name: req.body.name }).exec();
  } else if (req.body.email) {
    user = await Subscriber.findOne({ email: req.body.email }).exec();
  } else {
    res.status(400);
    res.send("Request passed without email or name.");
    return;
  }

  if (!user) {
    res.status(401);
    res.send("No such user found.");
    return;
  }

  const match = await bcrypt.compare(req.body.password, user.hashedPassword);

  if (!match) {
    res.status(401);
    res.send("Incorrect Password");
    return;
  }

  res.status(202);
  res.send({
    jwt: jwt.sign({ userName: req.body.name }, process.env.JWT_SECRET),
  });
});

// Verify One

router.get("/Verify", async (req, res) => {
  console.log("verify being touched");
});

// Get All

router.get("/", async (req, res) => {
  console.log("all being touched");
  try {
    const subscribers = await Subscriber.find();
    res.json({ subscribers: subscribers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get One

router.get("/:id", getSubscriberById, (req, res) => {
  console.log("all being touched");
  res.send(res.subscriber.name);
});

//CREATING ONE

router.post("/", async (req, res) => {
  console.log("create one being touched");
  let nameUser = await Subscriber.findOne({ name: req.body.name }).exec();
  let emailUser = await Subscriber.findOne({ email: req.body.email }).exec();

  if (nameUser || emailUser) {
    res.status(409);
    res.send("User already exists");
    return;
  }

  console.log(req.body);
  console.log(req.body.password);
  console.log(req.body.name);
  console.log(req.body.email);
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  const subscriber = new Subscriber({
    name: req.body.name,
    hashedPassword: hashedPassword,
    email: req.body.email,
  });

  try {
    const newSubscriber = await subscriber.save();
    res.status(201);
    res.send("User Created");
    return;
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
    return;
  }
});

//UPDATING ONE

router.patch("/:id", getSubscriberById, async (req, res) => {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name;
  }

  try {
    const updatedSubscriber = await res.subscriber.save();
    res.status(200).json({ message: updatedSubscriber });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//DELETING ONE

router.delete("/:id", getSubscriberById, async (req, res) => {
  try {
    await res.subscriber.remove();
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Helpers

async function getSubscriberByName(req, res, next) {
  let subscriber;
  console.log("getting by name");
  console.log(req.params.id);
  try {
    subscriber = await Subscriber.findOne({ name: req.params.id });
    if (subscriber == null) {
      return res.status(404).json({ message: "Cannot find subscriber" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.subscriber = subscriber;
  next();
}

async function getSubscriberById(req, res, next) {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (subscriber == null) {
      return res.status(404).json({ message: "Cannot find subscriber" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.subscriber = subscriber;
  next();
}
