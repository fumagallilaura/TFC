import { Request, Response } from 'express';
import * as services from '../services';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export default class UsersController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const user = await services.User.login(email, password);
    if (!user) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    const token = jwt.sign(email, JWT_SECRET);
    res.status(200).json({ user, token });
  }
}
