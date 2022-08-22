import { Request, Response } from 'express';
import * as services from '../services';

export default class TeamController {
  public static async getAll(_req: Request, res: Response) {
    const teams = await services.Team.getAll();
    return res.status(200).json(teams);
  }
}