import { Request, Response } from 'express';

import LeaderBoardService from '../services/Leaderboards';

export default class LeaderBoardController {
  static async getHome(_req: Request, res: Response) {
    const leaderboard = await LeaderBoardService.getBoardHome();
    return res.status(200).json(leaderboard);
  }
}