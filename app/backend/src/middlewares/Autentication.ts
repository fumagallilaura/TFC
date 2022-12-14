import { Request, Response } from 'express';

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

  public middleware(req: Request, res: Response) {
    const { authorization } = req.headers;

    if (!authorization) return res.status(400).json({ message: 'Token must be a valid token' });
    const token = this.verify(authorization);
    console.log(token);
    
    req.body = { email: token, ...req.body };
  }
}
const auth = new Autentication();
export default auth;