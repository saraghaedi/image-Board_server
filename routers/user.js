const { Router } = require("express");
const bcrypt = require("bcrypt");
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

// user sign up

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
      const user = await User.create({
        email,
        password: bcrypt.hashSync(password, 10),
        fullName,
      });
      res.json(user);
    }
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});
module.exports = router;
