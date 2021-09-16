const User = require("../models").user;
const { toData } = require("./jwt");

async function auth(req, res, next) {
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");
  if (auth && auth[0] === "Bearer" && auth[1]) {
    try {
      const data = toData(auth[1]);
      const user = await User.findByPk(data.userId);
      if (!user) {
        res.status(404).send({
          message: "User Not found",
        });
      } else {
        req.user = user;
        next();
      }
    } catch (e) {
      console.log(e.message);
      next(e);
    }
  } else {
    res.status(401).send({
      message: "Please supply some valid credentials",
    });
  }
}

module.exports = auth;
