import { Request, Response } from 'express';
import MatchService from '../services/Matches';

export default class MatchesController {
  static async getAll(req: Request, res: Response) {
    const { inProgress } = req.query
    const matches = MatchService.getAll(inProgress as string);
    return res.status(200).json(matches);
  }
}