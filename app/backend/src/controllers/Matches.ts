import { Request, Response } from 'express';
import MatchService from '../services/Matches';

export default class MatchesController {
  static async getAll(_req: Request, res: Response) {
    const matches = MatchService.getAll();
    return res.status(200).json(matches);
  }
}