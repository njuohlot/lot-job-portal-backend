const express = require("express");
const Category = require("../models/categoryModel.js");
const expressAsyncHandler = require("express-async-handler");
const {isAdmin, isAuth, generateToken} = require('../utils.js')

const categoryRouter = express.Router();


categoryRouter.post("/cats/add", (req, res) => {
  const catDetail = {
  name: req.body.name,
  
  }
  Category.create(catDetail, (err, data) => {
    if (err) {
      res.status(500).send(err.message);
      console.log(err);
    } else {
      res.status(201).send(data);
    }
  });
});
//get all categories
categoryRouter.get("/categories", async (req, res) => {
  const cat = await Category.find();
  res.send(cat);
});

//get home categories
categoryRouter.get("/home/categories", async (req, res) => {
  const cat = await Category.find().limit(8)
  res.send(cat);
});

//delete category
categoryRouter.delete(
  '/cat/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const cats = await Category.findById(req.params.id);
    if (cats) {
      await cats.remove();
      res.send({ message: 'Category Deleted' });
    } else {
      res.status(404).send({ message: 'Category Not Found' });
    }
  })
);
//delete category
categoryRouter.put(
  '/cat/:id',
  expressAsyncHandler(async (req, res) => {
    const cats = await Category.findById(req.params.id);
    if (cats) {
      cats.name = req.body.name;
     const updateCat = await cats.save();
      res.status(200).json(updateCat);
    } else {
      res.status(404).send({ message: 'Category Not Found' });
    }
  })
);



module.exports = categoryRouter;