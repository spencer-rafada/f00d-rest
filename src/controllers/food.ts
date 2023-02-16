import db from '../models/index';
import { NextFunction, Request, Response } from 'express';
import validation from '../middleware/validation';
import createError from 'http-errors';
const Food = db.food;

// GET all food
const getAllFood = async (req: Request, res: Response, next: NextFunction) => {
  await Food.find({}).then((data) => {
    if (data.length === 0) res.status(404).send({ message: `No Food.` });
    else res.status(200).send(data);
  });
};

// GET single food
const getFood = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!validation.validateObjectId(req.params.id)) {
      return res.status(400).send({ errors: `Must use a valid food id to get food` });
    }
    await Food.findOne({ _id: req.params.id }).then((data) => {
      if (!data) res.status(404).send({ message: `Food not found.` });
      else res.status(200).send(data);
    });
  } catch (error) {
    console.log(error);
  }
};

// POST food
const addFood = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validation.checkErrors(req);
    if (errors) return res.status(400).send({ errors });

    const newFood = new Food({
      foodName: req.body.foodName,
      localName: req.body.localName,
      origin: req.body.origin,
      cookTime: req.body.cookTime,
      ingredients: req.body.ingredients,
      recommendedVideos: req.body.recommendedVideos,
      category: req.body.category
    });

    const result = await newFood.save();
    if (result === newFood) {
      res
        .status(200)
        .send({ message: `Food with name: ${newFood.foodName} added with ID: ${result.id}` });
    } else {
      res.status(404).send({ message: `Food not added` });
    }
  } catch (err) {
    console.log(err);
  }
};

// PUT food
const updateFood = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validation.checkErrors(req);
    if (errors) return res.status(400).send({ errors });

    // Check if ID is valid
    if (!validation.validateObjectId(req.params.id)) {
      return res.status(400).send({ errors: `Must use valid food id to modify food` });
    }

    const newFoodInfo = {
      foodName: req.body.foodName,
      localName: req.body.localName,
      origin: req.body.origin,
      cookTime: req.body.cookTime,
      ingredients: req.body.ingredients,
      recommendedVideos: req.body.recommendedVideos,
      category: req.body.category
    };
    const filter = { _id: req.params.id };
    const result = await Food.updateOne(filter, newFoodInfo);
    if (result.modifiedCount === 0) res.status(404).send({ message: `No food modified.` });
    else res.status(204);
  } catch (err) {
    console.log(err);
  }
};

// DELETE food
const deleteFood = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!validation.validateObjectId(req.params.id)) {
      return res.status(400).send({ message: `Must use valid food id to delete food` });
    }

    const result = await Food.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) res.status(404).send({ message: `No food deleted.` });
    else res.status(200).send({ message: `Food with ID ${req.params.id} has been deleted.` });
  } catch (err) {
    console.log(err);
  }
};

export default { getAllFood, getFood, addFood, updateFood, deleteFood };
