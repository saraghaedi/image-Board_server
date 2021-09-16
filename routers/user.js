const { Router } = require("express");
const router = new Router();
const User = require("../models").user;

//get all users

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

// create a new user

router.post("/", async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    if (
      !fullName ||
      !email ||
      !password ||
      fullName === " " ||
      email === " " ||
      password === " "
    ) {
      res.status(400).send({ message: "Bad request" });
    } else {
      const user = await User.create(req.body);
      res.json(user);
    }
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});
module.exports = router;
