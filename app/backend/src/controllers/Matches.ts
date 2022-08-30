import { NextFunction, Request, Response } from 'express';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';
import MatchService from '../services/Matches';

export default class MatchController {
  static async getAll(req: Request, res: Response) {
    const { inProgress } = req.query
    const matches = await MatchService.getAll(inProgress as string);
    return res.status(200).json(matches);
  }
  static async teamsValidation(req: Request, res: Response, next: NextFunction) {
    const {
      homeTeam,
      awayTeam } = req.body;
    if (String(homeTeam) === String(awayTeam)) {
      return res.status(401).json({ message:
       'It is not possible to create a match with two equal teams',
      });
    }
    const teams = await Teams.findAll({ where: {
      id: [homeTeam, awayTeam],
    } });
    if (teams.length < 1) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    next();
  }
  static async create(req: Request, res: Response) {
    const {
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals } = req.body;
      
    if (homeTeam === awayTeam) {
      return res.status(401).json({ message: 'It is not possible to create a match with two equal teams' });
    }

    const getAwayTeam = await Teams.findByPk(awayTeam);
    const getHomeTeam = await Teams.findByPk(homeTeam);
    
    if (!getHomeTeam || !getAwayTeam) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    const team = await Matches.create({ 
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true, });
      
      console.log(team);
      // @ts-ignore
      const newMatcheComplete = await Matches.findByPk(team.id);

    return res.status(201).json(newMatcheComplete);
  }
  static async finish(req: Request, res: Response) {
    const { id } = req.params;
    await Matches.update({
      inProgress: false }, { where: { id } });
    return res.status(200).json({ message: 'Finished' });
  }
  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const {
      homeTeamGoals,
      awayTeamGoals } = req.body;

    await Matches.update({
      homeTeamGoals,
      awayTeamGoals }, { where: { id } });
      return res.status(200).json({ message: 'Finished' });
  }
}