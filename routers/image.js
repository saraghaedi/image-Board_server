const { Router } = require("express");
const router = new Router();
const Image = require("../models").image;

//get all images

router.get("/", async (req, res, next) => {
  try {
    const images = await Image.findAll();
    res.json(images);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

//save a new image in db

router.post("/", async (req, res, next) => {
  try {
    const { url } = req.body;
    if (!url) {
      res.status(400).send({ message: "url can not be empty" });
    } else {
      const newimage = await Image.create(req.body);
      res.json(newimage);
    }
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

//get one image by id

router.get("/:id", async (req, res, next) => {
  try {
    const image = await Image.findByPk(parseInt(req.params.id));
    if (!image) {
      res.status(404).send({ message: "Image not found" });
    } else {
      res.json(image);
    }
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

module.exports = router;
