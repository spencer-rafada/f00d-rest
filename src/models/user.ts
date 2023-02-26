import { Schema, Document } from 'mongoose';

interface User extends Document {
  nickname: string;
  name: string;
  email: string;
  email_verified: boolean;
}

export default (mongoose) => {
  const userSchema = new Schema<User>({
    nickname: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    email_verified: { type: Boolean }
  });

  const User = mongoose.model(`User`, userSchema, `user`);

  return User;
};
