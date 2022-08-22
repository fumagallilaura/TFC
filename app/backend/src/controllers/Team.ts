import { Request, Response } from 'express';
import * as services from '../services';

export default class TeamController {
  public static async getAll(_req: Request, res: Response) {
    const teams = await services.Team.getAll();
    return res.status(200).json(teams);
  }
  public static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await services.Team.getById(id);
    if (!team) return res.status(404).json({ mesage: 'Team does not exist' });
    return res.status(200).json(team);
  }
}