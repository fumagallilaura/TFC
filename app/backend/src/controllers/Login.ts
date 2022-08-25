import { Request, Response } from 'express';
import * as services from '../services';
import * as jwt from 'jsonwebtoken';
import Users from '../database/models/Users';

const JWT_SECRET = process.env.JWT_SECRET as string;

export default class UsersController {
  public static async login(req: Request, res: Response) {
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

  public static async validate(req: Request, res: Response) {
    const { authorization } = req.headers;

    if (!authorization) return res.status(400).json({
      message: 'You must have a authorization'
    })
    const email = jwt.verify(authorization, JWT_SECRET)
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'User dont exist' });
    }
    res.status(200).json({ role: user.role});
  }
}
