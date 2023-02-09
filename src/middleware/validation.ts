import { check } from 'express-validator';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

const foodCategory = [`filipino`, `american`, `mexican`, `african`, `chinese`];

const foodValidation = [
  check('foodName', 'Food Name is required.').not().isEmpty(),
  check('origin', 'Food origin is required.').not().isEmpty(),
  check(`cookTime`, `Cook Time cannot be less than 0`).notEmpty().isInt({ min: 0, max: 1440 }),
  check(`category`, `Category is not defined.`).isIn(foodCategory)
];

const updateFoodValidation = [
  check(`foodName`, `Food Name cannot be set to empty`).not().isEmpty(),
  check('origin', 'Food origin cannot be set to empty.').not().isEmpty(),
  check(`cookTime`, `Cook Time cannot be less than 0`).notEmpty().isInt({ min: 0, max: 1440 }),
  check(`category`, `Category cannot be empty and correct category.`).notEmpty().isIn(foodCategory)
];

// Check if the string ID is a valid MongoDB Object Id
const validateObjectId = (id: string): boolean => {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) {
      return true;
    }
    return false;
  }
  return false;
};

export default { foodValidation, validateObjectId, updateFoodValidation };
