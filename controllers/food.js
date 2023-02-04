const { ObjectId } = require('mongodb');
const mongodb = require(`../db/connect`);
var ObjectID = require(`mongodb`).ObjectId;

// GET all food
const getAllFood = async (req, res, next) => {
  // #swagger.description = `Gets all the food from the database.`
  const result = await mongodb.getDb().db(`f00d`).collection(`food`).find();

  result.toArray().then((foods) => {
    res.setHeader(`Content-Type`, `application/json`);
    res.status(200).json(foods);
  });
};

// GET single food
const getFood = async (req, res, next) => {
  // #swagger.description = `Find food with the corresponding route params id`
  var o_id = new ObjectID(req.params.id);
  const result = await mongodb.getDb().db(`f00d`).collection(`food`).find({ _id: o_id });

  (await result.count()) > 0
    ? result.toArray().then((food) => {
        res.setHeader(`Content-Type`, `application/json`);
        res.status(200).json(food);
      })
    : res.status(404).json({ message: `No document found` });
};

// POST food
const addFood = async (req, res, next) => {
  /* #swagger.description = `Add food to the database` */
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

// PUT food
const updateFood = async (req, res, next) => {
  // #swagger.description = `Update information of food in database.`
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
    const o_id = new ObjectID(req.params.id);
    const _ = await mongodb
      .getDb()
      .db(`f00d`)
      .collection(`food`)
      .updateOne({ _id: o_id }, { $set: food })
      .then((result) => {
        res.setHeader(`Content-Type`, `application/json`);
        result.modifiedCount > 0
          ? res.status(204).json({ message: `Food has been updated.` })
          : res.status(404).json({ message: `No document updated.` });
      });
  } catch (err) {
    console.log(err);
  }
};

// DELETE food
const deleteFood = async (req, res, next) => {
  // #swagger.description = `Deletes food in the database.`
  try {
    const o_id = new ObjectId(req.params.id);
    const _ = await mongodb
      .getDb()
      .db(`f00d`)
      .collection(`food`)
      .deleteOne({ _id: o_id }, {})
      .then((result) => {
        result.deletedCount > 0
          ? res
              .status(200)
              .json({ mesage: `Document with ID: ${req.params.id} successfully deleted` })
          : res.status(404).json({ message: `No document deleted.` });
      });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getAllFood, getFood, addFood, updateFood, deleteFood };
