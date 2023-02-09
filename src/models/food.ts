import { Schema } from 'mongoose';

interface Food {
  foodName: string;
  localName?: string;
  origin: string;
  cookTime: number;
  ingredients?: string[];
  recommendedVideos?: string[];
  category?: string;
}

export default (mongoose) => {
  const foodSchema = new Schema<Food>({
    foodName: { type: String, required: true },
    localName: { type: String },
    origin: { type: String, required: true },
    cookTime: { type: Number, required: true },
    ingredients: { type: [String] },
    recommendedVideos: { type: [String] },
    category: { type: String }
  });

  const Food = mongoose.model(`Food`, foodSchema, `food`);

  return Food;
};
