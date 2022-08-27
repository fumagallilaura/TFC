import { NextFunction, Request, Response } from 'express';

import * as jwt from 'jsonwebtoken';

export default class Autentication {
  private secret: string;

  private verify(token: string) {
    return jwt.verify(token, this.secret) as { id: number };
  }

  public middleware(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) return res.status(400).json({ message: 'no auth' });
    const { id } = this.verify(authorization);
    req.body = { userId: id, ...req.body };
    next();
  }
}