const mongodb = require(`../db/connect`);
var ObjectID = require(`mongodb`).ObjectId;

// GET all food
const getAllFood = async (req, res, next) => {
  const result = await mongodb.getDb().db(`f00d`).collection(`food`).find();

  result.toArray().then((foods) => {
    res.setHeader(`Content-Type`, `application/json`);
    res.status(200).json(foods);
  });
};

// POST food
const addFood = async (req, res, next) => {
  try {
    const food = {
      recipeName: req.body.recipeName,
      localName: req.body.localName,
      origin: req.body.origin,
      cookTime: req.body.cookTime,
      ingredients: req.body.ingredients,
      recommendedVideos: req.body.recommendedVideos,
      category: req.body.category
    };
    const result = await mongodb.getDb().db(`f00d`).collection(`food`).insertOne(food);
    res.setHeader(`Content-Type`, `application/json`);
    result
      ? res.status(201).json({
          message: `Document has been added successfully with document id: ${result.insertedId.toString()}`
        })
      : res.status(404).json({ message: `Document not added` });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllFood, addFood };
