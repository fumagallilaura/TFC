import { NextFunction, Request, Response } from 'express';

import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

class Autentication {
  private secret: string;

  constructor(){
    this.secret = process.env.JWT_SECRET as string
  }

  private verify(token: string) {
    return jwt.verify(token, this.secret) as { id: number};
  }

  public middleware(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) return res.status(400).json({ message: 'no auth' });
    console.log(this)
    const token = this.verify(authorization);
    req.body = { userId: token.id, ...req.body };
    next();
  }
}
const auth = new Autentication();
export default auth;