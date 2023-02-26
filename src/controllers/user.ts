import db from '../models/index';
import { NextFunction, Request, Response } from 'express';
const User = db.user;

// Add User to DB
const addUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.oidc.isAuthenticated()) {
      const findResult = await User.find({ email: req.oidc.user.email });
      if (findResult.length === 0) {
        const newUser = new User({
          nickname: req.oidc.user.nickname,
          name: req.oidc.user.name,
          email: req.oidc.user.email,
          email_verified: req.oidc.user.email_verified
        });
        await newUser.save();
        res.json(`Hello Food Lover ${req.oidc.user.nickname}!`);
      }
    } else {
      res.json(`Join us now!`);
    }
  } catch (error) {
    console.log(error);
  }
};

export default { addUser };
