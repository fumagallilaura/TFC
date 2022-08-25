import Team from '../database/models/Teams';
// https://github.com/sequelize/sequelize-typescript/issues/618
import { FindOptions } from 'sequelize';
import Teams from '../database/models/Teams';

import Matches from '../database/models/Matches';

export default class MatchService {
  public static async getAll(inProgress?: string) {
    // https://github.com/sequelize/sequelize-typescript/tree/1.0.0#upgrade-to-sequelize-typescript1
    let findOptions:FindOptions = { include: [
      { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
    ]};
    if (inProgress === 'true') {
      findOptions = {
        where: { inProgress: true }, ...findOptions };
    }
    if (inProgress === 'false') {
      findOptions = {
        where: { inProgress: false }, ...findOptions };
    }
    const matches = await Matches.findAll(findOptions);
    return matches;
  }
}