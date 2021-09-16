const { Router } = require("express");
const User = require("../models").user;
const { toJWT, toData } = require("../auth/jwt");
const bcrypt = require("bcrypt");
const authMiddleware = require("../auth/middleware");

const router = new Router();

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send({
        message: "Please supply a valid email and password",
      });
    } else {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        res.status(400).send({
          message: "User with that email does not exist",
        });
      } else if (bcrypt.compareSync(password, user.password)) {
        const jwt = toJWT({ userId: user.id });
        res.send({
          jwt,
        });
      } else {
        res.status(400).send({
          message: "Password was incorrect",
        });
      }
    }
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

module.exports = router;
