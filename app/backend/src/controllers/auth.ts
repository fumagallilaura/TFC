import { NextFunction, Request, Response } from 'express';
import Authentication from '../middlewares/Autentication'
const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Authentication.middleware(req, res);
    next()
  } catch(error) {
    console.log(error);
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
}

export default auth;
